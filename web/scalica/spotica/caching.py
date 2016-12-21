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

# Cache location of global sentiment
def cache_global_sentiment_json(path):
	if path is None:
		logger.error('Trying to cache global sentiment file location with no path')
		return
	cache.set('global-sentiment', path)

# Get cache location of global sentiment
def check_global_sentiment_json():
	possible = cache.get('global-sentiment')
	if possible is None:
		possible = 'global_sentiment.json'
	return possible

# Get cache location of global sentiment
def check_user_sentiment_json(user_id):
	possible = cache.get('user-sentiment-' + str(user_id))
	if possible is None:
		file = 'user-sentiment-'+str(user_id)+'.json'
		with open(settings.MEDIA_ROOT + file, 'a') as f:
			f.write('[]')
		possible = file
	return possible


# Cache location of global sentiment
def cache_user_sentiment_json(path, user_id):
	if path is None:
		logger.error('Trying to cache user sentiment file location with no path')
		return
	cache.set('user-sentiment-' + str(user_id), path)


def user_sentiment_json_file(user_id):
	file = check_user_sentiment_json(user_id)
	cache_user_sentiment_json(file, user_id)
	return settings.MEDIA_ROOT + file

def user_sentiment_json_url(user_id):
	file = check_user_sentiment_json(user_id)
	cache_user_sentiment_json(file, user_id)
	return settings.MEDIA_URL + file

def global_sentiment_json_file():
	file = check_global_sentiment_json()
	cache_global_sentiment_json(file)
	return settings.MEDIA_ROOT + file

def global_sentiment_json_url():
	file = check_global_sentiment_json()
	cache_global_sentiment_json(file)
	return settings.MEDIA_URL + check_global_sentiment_json()
