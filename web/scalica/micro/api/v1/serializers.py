from django.contrib.auth.models import User
from micro.models import Post, SongPost
from rest_framework import serializers

class UserSerializer(serializers.HyperlinkedModelSerializer):

  class Meta:
    model = User
    fields = ('username',)

class PostSerializer(serializers.HyperlinkedModelSerializer):
  user = UserSerializer('user')

  class Meta:
    model = Post
    fields = ('id', 'user', 'text', 'pub_date',)

class SongPostSerializer(serializers.HyperlinkedModelSerializer):
  user = UserSerializer('user')

  class Meta:
    model = SongPost
    fields = ('spotify_uri', 'user', 'text', 'pub_date', 'spotify_uri',)
