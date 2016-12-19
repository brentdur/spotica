import spotipy
from analysisFlow.analysis import Sentiment
from analysisFlow.lyrics import Song
from datetime import datetime
from datetime import timedelta
<<<<<<< HEAD
from django.utils import timezone
from dateutil.relativedelta import relativedelta
=======
>>>>>>> origin/savannah

# Initialize our django application for this external usage
from django.core.wsgi import get_wsgi_application
import sys
import os

# Add the parent directory to the system path at runtime
sys.path.append('../')
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "scalica.settings")

# Load in the application to be able to access the models
application = get_wsgi_application()

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
<<<<<<< HEAD
# time_range = datetime.now() - timedelta(hours=1)
start = timezone.now().date() - relativedelta(hours=+1)
end = timezone.now().date() - relativedelta(hours=+0)
startdate = datetime.now()
# array_of_songs = SongPost.objects.filter(pub_date__lt=time_range)
# array_of_songs = SongPost.objects.filter(pub_date__gte=start, pub_date__lte=end)
array_of_songs = SongPost.objects.filter()

print(len(array_of_songs))
array_of_uris = []
count = 0
for song in array_of_songs:
    array_of_uris.append(array_of_songs[count].spotify_uri)
    count += 1
print(array_of_uris)
=======
time_range = datetime.now() - timedelta(hours=1)
array_of_sentiments = SongPost.objects.filter(pub_date__lt=time_range)
print(array_of_sentiments)

def calculate_hourly_sentiment():
	# TODO: make array of all SongPosts in one hour
	array_of_sentiments = []
	time_range = datetime.now() - timedelta(hours=1)
	array_of_sentiments = SongPost.objects.filter(pub_date__lt=time_range)
	print(array_of_sentiments)
	# TODO: access database
>>>>>>> origin/savannah
