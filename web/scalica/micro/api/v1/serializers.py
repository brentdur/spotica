from django.contrib.auth.models import User
from micro.models import Post, SongPost
from rest_framework import serializers

class PostSerializer(serializers.HyperlinkedModelSerializer):
  user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())

  class Meta:
    model = Post
    fields = ('id', 'user', 'text', 'pub_date',)

class SongPostSerializer(serializers.HyperlinkedModelSerializer):
  class Meta:
    model = SongPost
    fields = ('id', 'user', 'text', 'pub_date', 'spotify_track_id',)
