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

albums = ["spotify:album:4pC2URLdvle8V6Um4qxh46", "spotify:album:0cbpcdI4UySacPh5RCpDfo", "spotify:album:4nKfZbCALT9H9LfedtDwnZ", "spotify:album:5tbykpeXPR1kEeveI0xOzK", "spotify:album:5NOhXlXwlcGhRbfDWQRij0", "spotify:album:3539EbNgIdEDGBKkUf4wno", "spotify:album:1Od4S26RB37khls09dsUxL"]

for album in sp.artist_albums('spotify:artist:0du5cEVh5yTK9QJze8zA0C')['items']:
	albums.append(album['uri'])

for album in albums:
	for song in sp.album_tracks(album)['items']:
		spotify_track_ids.append(song['uri'])

current = timezone.now() - timedelta(days = 1)

if len(users) > 0:
	for x in range(0, 7):
		freeze_time(current)
		for y in range(0, 50):
			user = random.choice(users)
			song = random.choice(spotify_track_ids)
			SongPost.objects.create(user=user, text="blah blah blah", spotify_uri=song)
		current = current - timedelta(days = 1)


while current < timezone.now():
	freeze_time(current)

	tasks.calculate_hourly_global_sentiment(current)

	current = current + timedelta(hours=1)



# Create your tasks here


# This task will be triggered when a user plays a son
