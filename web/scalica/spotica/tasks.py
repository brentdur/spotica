# Create your tasks here
from __future__ import absolute_import, unicode_literals
from celery import shared_task
from spotica.analysisFlow.analysis import Sentiment
from spotica.analysisFlow.lyrics import Song
import re
import json

from django.core.cache import cache
import logging
import spotipy
from datetime import datetime
from datetime import timedelta

# Initialize our django application for this external usage
from django.conf import settings

from micro.models import Post, SongPost
from django.contrib.auth.models import User

from spotica import caching

# This task will be triggered when a user plays a song

@shared_task
def run_analysis_on_song(spotify_uri):
	spotify_id = re.sub(r'spotify:track:', '', spotify_uri)
	sentiment = caching.check_for_cached_sentiment(spotify_id)
	if sentiment is None:
		sp = spotipy.Spotify()
		tcks = sp.track(spotify_uri)
		name = tcks['name']
		artists = tcks['artists']
		if len(artists) > 0:
			artist = artists[0]['name']
		else:
			artist = artists['name']
		s = Song(artist=artist, title=name)
		lyrics = s.lyrics()
		if lyrics is None:
			sentiment = 0.0
		else:
			sentiment_object = Sentiment(lyrics)
			sentiment = sentiment_object.get_sentiment_score()
		caching.cache_sentiment(spotify_id, sentiment)
	return sentiment

# This task will be triggered when a user plays a song possibly by the above task
@shared_task
def update_user_timeseries(user_id):
	calculate_user_sentiment(user_id)

# This task will be triggered once per hour as a celery-beat task
@shared_task
def update_global_timeseries():
	calculate_hourly_global_sentiment()
	hour = 0

def calculate_user_sentiment(user_id):
	# make array of all SongPosts made by a single user in the last hour
	startdate = datetime.now() - timedelta(hours=1, minutes=2)
	array_of_songs = SongPost.objects.filter(user_id=user_id)
	count = 0
	array_of_sentiments = []
	for song in array_of_songs:
		# convert to regular id from uri
		spotify_uri = song.spotify_uri
		spotify_id = re.sub(r'spotify:track:', '', spotify_uri)
		# cache sentiment
		#TODO: switch to redis
		sentiment = caching.check_for_cached_sentiment(spotify_id)
		if sentiment is None:
			sentiment = run_analysis_on_song(spotify_id)
		array_of_sentiments.append(sentiment)
		count += 1
	# sum up all sentiment values
	total = 0
	for sentiment in array_of_sentiments:
		total += sentiment
	print(total)
	average_sentiment = total / (len(array_of_sentiments))
	to_add_to_json = {"total": int(total), "sentiment": average_sentiment}
	data = []
	path = caching.user_sentiment_json_file(user_id)
	with open(path) as f:
		data = json.load(f)
	data.append(to_add_to_json)
	with open(path, 'w') as f:
		json.dump(data, f)


def calculate_hourly_global_sentiment(current=None):
	# make array of all SongPosts made in the last hour
	if current is None:
		now = datetime.now()
	else:
		now = current
	startdate = now - timedelta(hours=1, minutes=2)
	array_of_songs = SongPost.objects.filter(pub_date__gt=startdate)
	count = 0
	array_of_sentiments = []
	for song in array_of_songs:
		# convert to regular id from uri
		spotify_uri = song.spotify_uri
		spotify_id = re.sub(r'spotify:track:', '', spotify_uri)
		# cache sentiment
		#TODO: switch to redis
		sentiment = caching.check_for_cached_sentiment(spotify_id)
		if sentiment is None:
			sentiment = run_analysis_on_song(spotify_id)
		array_of_sentiments.append(sentiment)
		count += 1
	# sum up all sentiment values
	total = 0
	for sentiment in array_of_sentiments:
		total += sentiment
	print(total)
	average_sentiment = total / (len(array_of_sentiments))
	# ADD TO THE JSON file
	to_add_to_json = {"time": startdate.strftime("%Y-%m-%dT%H:%M:%S"), "sentiment": average_sentiment}
	data = []
	path = caching.global_sentiment_json_file()
	with open(path) as f:
		data = json.load(f)
	data.append(to_add_to_json)
	with open(path, 'w') as f:
		json.dump(data, f)