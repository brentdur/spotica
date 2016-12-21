from rest_framework import viewsets
from rest_framework.decorators import list_route, detail_route
from rest_framework.response import Response
from micro.models import Post, SongPost
from .serializers import PostSerializer, SongPostSerializer
from rest_framework import serializers
from spotica import tasks as celery_tasks

class PostViewSet(viewsets.ModelViewSet):
  """
  API endpoint for posts to be viewed/edited/created
  """
  queryset = Post.objects.all()
  serializer_class = PostSerializer

  @list_route(methods=['post'])
  def submit(self, request, *args, **kwargs):
    post = Post.objects.create(
      user=request.user,
      text=request.data.get('text'))
    data = self.get_serializer(post).data

    return Response(data)

class SongPostViewSet(viewsets.ModelViewSet):
  """
  API endpoint for song posts
  """
  queryset = SongPost.objects.all()
  serializer_class = SongPostSerializer

  @list_route(methods=['post'])
  def submit(self, request, *args, **kwargs):
    post = SongPost.objects.create(
      user=request.user,
      text=request.data.get('text'),
      spotify_uri=request.data.get('spotify_uri'),
    )
    celery_tasks.update_user_timeseries.delay(request.user.id)
    data = self.get_serializer(post).data

    return Response(data)
