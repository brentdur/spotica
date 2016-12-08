from django.contrib.auth.models import User
from micro.models import Post, Song
from rest_framework import serializers

class PostSerializer(serializers.HyperlinkedModelSerializer):
  user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())

  class Meta:
    model = Post
    fields = ('id', 'user', 'text', 'pub_date',)

class SongSerializer(serializers.HyperlinkedModelSerializer):
  class Meta:
    model = Song
    fields = ('id', )
