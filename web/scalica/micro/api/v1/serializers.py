from micro.models import Post, Song
from rest_framework import serializers

class PostSerializer(serializers.HyperlinkedModelSerializer):
  class Meta:
    model = Post
    fields = ('id',)

class SongSerializer(serializers.HyperlinkedModelSerializer):
  class Meta:
    model = Song
    fields = ('id', )
