from rest_framework import viewsets
from rest_framework.decorators import list_route, detail_route
from rest_framework.response import Response
from micro.models import Post, SongPost
from .serializers import PostSerializer, SongPostSerializer

class PostViewSet(viewsets.ModelViewSet):
  """
  API endpoint for posts to be viewed/edited/created
  """
  queryset = Post.objects.all()
  serializer_class = PostSerializer

class SongPostViewSet(viewsets.ModelViewSet):
  """
  API endpoint for song posts
  """
  queryset = SongPost.objects.all()
  serializer_class = SongPostSerializer
