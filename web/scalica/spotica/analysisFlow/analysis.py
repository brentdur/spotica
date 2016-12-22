import json
from os.path import join, dirname
from watson_developer_cloud import AlchemyLanguageV1
from watson_developer_cloud import WatsonException

class Sentiment(object):
	def __init__(self, lyrics):
		self.lyrics = lyrics
		self.alchemy_language = AlchemyLanguageV1(url='https://access.alchemyapi.com/calls', api_key='ded5d6e8933107f1493d67b1aca33866b9887120')

	def get_sentiment_score(self):
		combined_operations = ['doc-sentiment']
		lyr = self.lyrics
		print(lyr)
		if not lyr:
			return 0.0	
		response = ""
		try:
			response = self.alchemy_language.combined(text=lyr, extract=combined_operations)
		except WatsonException as e:
			print("Watson error: " +  str(e))
			return 0.0
		print(response)
		if response['docSentiment']['type'] == 'neutral':
			return 0.0
		return(float(response['docSentiment']['score']))
