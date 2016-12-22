from django.contrib.auth.models import User
from django.db import IntegrityError
from micro.models import SongPost
import random
from datetime import datetime, timedelta
from freezegun import freeze_time
import spotipy
import os
from django.utils import timezone

from spotica import tasks

names = ['amy', 'bob', 'cat', 'dom', 'egor', 'freddy', 'geoffry', 'hector', 'inigo', 'jake', 'kyle']
users = []
spotify_track_ids = []
for name in names:
	try:
		user = User.objects.create_user(name, name + '@example.com', 'testtesttest')
		users.append(user)
	except IntegrityError as e:
		continue

sp = spotipy.Spotify()

albums = ["spotify:album:4pC2URLdvle8V6Um4qxh46", "spotify:album:0cbpcdI4UySacPh5RCpDfo", "spotify:album:4nKfZbCALT9H9LfedtDwnZ", "spotify:album:5tbykpeXPR1kEeveI0xOzK", "spotify:album:5NOhXlXwlcGhRbfDWQRij0", "spotify:album:3539EbNgIdEDGBKkUf4wno", "spotify:album:1Od4S26RB37khls09dsUxL", "spotify:album:0K4pIOOsfJ9lK8OjrZfXzd", "spotify:album:1azUkThwd2HfUDdeNeT147", "spotify:album:6Pb3K1oPXdhsqFXtzKe3Z1", "spotify:album:3D4FYzqPi2LqJWyfsY1ZdI", "spotify:album:2B2xiybenVwWzkGclQQkzi","spotify:album:7gmak9ZGm10y4PtZa9SBQn","spotify:album:5JXp0gHTV2oA4DsLSixK1y","spotify:album:2ODvWsOgouMbaA5xf0RkJe","spotify:album:0P3oVJBFOv3TDXlYRhGL7s","spotify:album:3cfAM8b8KqJRoIzt3zLKqw","spotify:album:2G4AUqfwxcV1UdQjm2ouYr","spotify:album:2R7iJz5uaHjLEVnMkloO18","spotify:album:4XTT0NcNHyvl6h9JX2AfEi","spotify:album:4E7bV0pzG0LciBSWTszra6",
"spotify:album:78bpIziExqiI9qztvNFlQu","spotify:album:6fC6BRXbuHSVobwWcwe6M7","spotify:album:2whKuzNvFl6OnkiOvN1vA0","spotify:album:0pvhletDH7CphbKErUtPCF","spotify:album:6odcotWv2xd7NP7RrGBS5b","spotify:album:6oX0gpxTxSrCZ1QJikDhMN","spotify:album:0vGxxgC1zHtpE9YXJ2p3aj","spotify:album:6tJBLSMVDUizDX86QDiYzg","spotify:album:6Fr2rQkZ383FcMqFyT7yPr","spotify:album:3OZgEywV4krCZ814pTJWr7","spotify:album:2UJwKSBUz6rtW4QLK74kQu","spotify:album:6RS1XvMUnj5HfHunnNzSSW","spotify:album:7pomP86PUhoJpY3fsC0WDQ"]

for album in sp.artist_albums('spotify:artist:0du5cEVh5yTK9QJze8zA0C')['items']:
	albums.append(album['uri'])

for album in albums:
	for song in sp.album_tracks(album)['items']:
		spotify_track_ids.append(song['uri'])

current = timezone.now() - timedelta(days = 1)

if len(users) > 0:
	for x in range(0, 168):
		freeze_time(current)
		for y in range(0, 20):
			user = random.choice(users)
			song = random.choice(spotify_track_ids)
			SongPost.objects.create(user=user, text="blah blah blah", spotify_uri=song)
		current = current - timedelta(hours=1)


while current < timezone.now():

	tasks.calculate_hourly_global_sentiment(current)

	current = current + timedelta(hours=2)



# Create your tasks here


# This task will be triggered when a user plays a son
