from rest_framework import viewsets
from rest_framework.decorators import list_route, detail_route
from rest_framework.response import Response
from micro.models import Post, Song
from .serializers import SongSerializer, PostSerializer

class PostViewSet(viewsets.PostViewSet):
  """
  API endpoint for posts to be viewed/edited/created
  """
  queryset = Post.objects.all()
  serializer_class = PostSerializer

class SongViewSet(viewsets.ModelViewSet):
  """
  API endpoint for songs to be viewed/edited/created
  """
  queryset = Song.objects.all()
  serializer_class = SongSerializer
