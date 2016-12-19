import json
from os.path import join, dirname
from watson_developer_cloud import AlchemyLanguageV1

class Sentiment(object):
	def __init__(self, lyrics):
		self.lyrics = lyrics
		self.alchemy_language = AlchemyLanguageV1(url='https://access.alchemyapi.com/calls', api_key='3f6f101319912788f1c51ec4d9fe7ac4f4e74516')

	def get_sentiment_score(self):
		combined_operations = ['doc-sentiment']
		response = self.alchemy_language.combined(text=self.lyrics, extract=combined_operations)
		return(float(response['docSentiment']['score']))