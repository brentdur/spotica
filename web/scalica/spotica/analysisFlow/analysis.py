import json
from os.path import join, dirname
from watson_developer_cloud import AlchemyLanguageV1

class Sentiment(object):
	def __init__(self, lyrics):
		self.lyrics = lyrics
		self.alchemy_language = AlchemyLanguageV1(url='https://access.alchemyapi.com/calls', api_key='8bd18dcc29f34442114f953af8f1775efa2e6618')

	def get_sentiment_score(self):
		combined_operations = ['doc-sentiment']
		lyr = self.lyrics
		print(lyr)
		if not lyr:
			return 0.0	
		response = self.alchemy_language.combined(text=lyr, extract=combined_operations)
		print(response)
		if response['docSentiment']['type'] == 'neutral':
			return 0.0
		return(float(response['docSentiment']['score']))
