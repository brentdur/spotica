# Create your tasks here
from __future__ import absolute_import, unicode_literals
from celery import shared_task
from analysisFlow.analysis import Sentiment
from analysisFlow.lyrics import Song

from django.core.cache import cache
import logging
import spotipy
import datetime

# This task will be triggered when a user plays a song


@shared_task
def run_analysis_on_song(spotify_uri):
	spotify_id = re.sub(r'spotify:track:', '', spotify_uri)
	sentiment = check_for_cached_sentiment(spotify_id)
	if sentiment is None:
			sp = spotipy.Spotify()
			spotify_uri = spotify_uri
			title = sp.track(spotify_uri)
			name = track['name']
			artists = track['artists']
			if len(artists) > 0:
			    artist = artists[0]['name']
			s = Song(artist=artist, title=title)
			lyrics = s.lyrics()
			sentiment_object = Sentiment(lyrics)
			score = sentiment_object.get_sentiment_score()
			sentiment = score
		# return
	# insert function call or code here to get sentiment
	# sentiment = function(song_id)
	cache_sentiment(spotify_id, sentiment)


	# song.sentiment = sentiment
	# song.save()

# This task will be triggered when a user plays a song possibly by the above task
@shared_task
def update_user_timeseries(user_id):
	return
	# insert either function call or code here

# This task will be triggered once per hour as a celery-beat task
@shared_task
def update_global_timeseries():
	hour = 0
	# TODO: call calculate_hour_sentiment
	average_sentiment = 0
	# TODO: store hour and sentiment in two variables
	# TODO: append these two variables to JSON file
	return
	# insert either function call or code here

def calculate_hourly_sentiment():
	# TODO: make array of all SongPosts in one hour
	array_of_sentiments = []
	time_range = datetime.now() - timedelta(hours=1)
	array_of_sentiments = SongPost.objects.filter(created__lt=time_range)
	print(array_of_sentiments)
	# TODO: access database

# CACHE - temporary location

# Get an instance of a logger
logger = logging.getLogger(__name__)
# Obivously this code won't live here, just examples

# Cache sentiment for a particular song
def cache_sentiment(spotify_track_id, sentiment):
	if spotify_track_id is None or sentiment is None:
		logger.error('Trying to cache sentiment with no track id or sentiment')
		return
	cache.set('song-sentiment-' + spotify_track_id, sentiment)

# Check cache for sentiment for a particular song and returns it if found
# Returns None if not found
def check_for_cached_sentiment(spotify_track_id):
	if spotify_track_id is None:
		logger.error('Trying get song sentiment from cache with no track id')
		return
	return cache.get('song-sentiment-' + spotify_track_id)

def cache_user_sentiment_json(path, user_id):
	if path is None or user is None:
		logger.error('Trying to cache user sentiment file location with no path or user_id')
		return
	cache.set('user-sentiment-' + user_id, path)

# Get cache location of user's json
def json_file_for_user(user):
	if user is None:
		logger.error('Trying get user sentiment file location from cache with no user')
		return
	return cache.get('user-sentiment-' + user_id)

# Cache location of global sentiment
def cache_global_sentiment_json(path):
	if path is None:
		logger.error('Trying to cache global sentiment file location with no path')
		return
	cache.set('global-sentiment', path)

# Get cache location of global sentiment
def cache_global_sentiment_json():
	return cache.get('global-sentiment')
