import spotipy
from analysisFlow.analysis import Sentiment
from analysisFlow.lyrics import Song


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
