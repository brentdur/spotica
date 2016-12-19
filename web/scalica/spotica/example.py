import spotipy
from analysisFlow.analysis import Sentiment
from analysisFlow.lyrics import Song
from datetime import datetime
from datetime import timedelta
from micro.models import Post, SongPost

sp = spotipy.Spotify()
spotify_uri = "spotify:track:6NPVjNh8Jhru9xOmyQigds"
track = sp.track(spotify_uri)
title = track['name']
artists = track['artists']
if len(artists) > 0:
    artist_name = artists[0]['name']
print (title)
print (artist_name)
s = Song(artist = artist_name, title = title)
lyrics = s.lyrics()
sentiment = Sentiment(lyrics)
score = sentiment.get_sentiment_score()
print(score)
# TODO: make array of all SongPosts in one hour
array_of_sentiments = []
time_range = datetime.now() - timedelta(hours=1)
array_of_sentiments = SongPost.objects.filter(created__lt=time_range)
print(array_of_sentiments)

def calculate_hourly_sentiment():
	# TODO: make array of all SongPosts in one hour
	array_of_sentiments = []
	time_range = datetime.now() - timedelta(hours=1)
	array_of_sentiments = SongPost.objects.filter(created__lt=time_range)
	print(array_of_sentiments)
	# TODO: access database
