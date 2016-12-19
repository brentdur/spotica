# How to use these scrips

```
pip install -r requirements.txt
```

```python
from analysis import Sentiment
from lyrics import Song

# Create song object
s = Song(artist="Pharell", title="Happy")
# Get the lyrics
lyrics = s.lyrics()
# Create the sentiment object
sentiment = Sentiment(lyrics)
# Get the sentiment score
score = sentiment.get_sentiment_score()
```
