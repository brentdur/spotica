from django.contrib.auth.models import User
from micro.models import SongPost
import random
from datetime import datetime, timedelta
from freezegun import freeze_time
import spotipy
import os

from spotica import tasks

names = ['amy', 'bob', 'cat', 'dom', 'egor', 'freddy', 'geoffry', 'hector', 'inigo', 'jake', 'kyle']
users = []
spotify_track_ids = []
for name in names:
	user = User.objects.create_user(name, name + '@example.com', 'testtesttest')
	users.append(user)

sp = spotipy.Spotify()

for album in sp.artist_albums('spotify:artist:0du5cEVh5yTK9QJze8zA0C')['items']:
	for song in sp.album_tracks(album['uri'])['items']:
		spotify_track_ids.append(song['uri'])

current = datetime.now() - timedelta(days = 1)

for x in range(0, 7):
	freeze_time(current)
	for y in range(0, 50):
		user = random.choice(users)
		song = random.choice(spotify_track_ids)
		SongPost.objects.create(user=user, text="blah blah blah", spotify_uri=song)
	current = current - timedelta(days = 1)


while current < datetime.now():
	freeze_time(current)

	tasks.calculate_hourly_sentiment(current)

	current = current + timedelta(hours=1)



# Create your tasks here


# This task will be triggered when a user plays a son