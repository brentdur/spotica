import spotipy
from analysisFlow.analysis import Sentiment
from analysisFlow.lyrics import Song
from datetime import datetime
from datetime import timedelta
from django.utils import timezone
from dateutil.relativedelta import relativedelta
import re
import json

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
# time_range = datetime.now() - timedelta(hours=1)
# start = timezone.now().date() - relativedelta(hours=+1)
# end = timezone.now().date() - relativedelta(hours=+0)
# array_of_songs = SongPost.objects.filter(pub_date__lt=time_range)
# array_of_songs = SongPost.objects.filter(pub_date__gte=start, pub_date__lte=end)
startdate = datetime.now() - timedelta(hours=1)
array_of_songs = SongPost.objects.filter(pub_date__gt=startdate)
count = 0
array_of_sentiments = []
for song in array_of_songs:
    # convert to regular id from uri
    spotify_uri = array_of_songs[count].spotify_uri
    spotify_id = re.sub(r'spotify:track:', '', spotify_uri)
    # cache sentiment
    #TODO: switch to redis
    array_of_sentiments.append(0.9)
    count += 1
# sum up all sentiment values
total = 0
for sentiment in array_of_sentiments:
    total += sentiment
average_sentiment = total / (len(array_of_sentiments))

to_add_to_json = {str(startdate): average_sentiment}
data = {}
with open('global_sentiment.json') as f:
    data = json.load(f)
data.update(to_add_to_json)
with open('global_sentiment.json', 'w') as f:
    json.dump(data, f)


# to_add_to_json = {str(startdate): average_sentiment}
# data = {}
# with open('global_sentiment.json') as f:
#     data = json.load(f)
# data.update(to_add_to_json)
# with open('global_sentiment.json', 'w') as f:
#     json.dump(data, f)


# with open('global_sentiment.json', 'w') as fp:
#     data = {str(startdate): average_sentiment}
#     json.dump(data, fp)

# with open(global_sentiment.json) as json_file:
#     json_decoded = json.load(json_file)
# json_decoded[str(startdate)] = average_sentiment
# with open(global_sentiment.json, 'w') as json_file:
#     json.dump(json_decoded, json_file)



def calculate_hourly_sentiment():
	# TODO: make array of all SongPosts in one hour
	array_of_sentiments = []
	time_range = datetime.now() - timedelta(hours=1)
	array_of_sentiments = SongPost.objects.filter(pub_date__lt=time_range)
	print(array_of_sentiments)
	# TODO: access database
