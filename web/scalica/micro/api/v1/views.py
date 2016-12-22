from rest_framework import viewsets
from rest_framework.decorators import list_route, detail_route
from rest_framework.response import Response
from micro.models import Post, SongPost, Following
from .serializers import PostSerializer, SongPostSerializer
from rest_framework import serializers
from spotica import tasks as celery_tasks
from operator import attrgetter
from itertools import chain

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

  @list_route(methods=['get'])
  def query_more(self, request):
    last_id = int(request.GET['last_id']);

    follows = [o.followee_id for o in Following.objects.filter(
        follower_id=request.user.id)]

    # Get a list of text and songs posts, sorted by date
    song_posts = SongPost.objects.filter(
        user_id__in=follows + [request.user.id])
    song_posts = [post for post in song_posts if post.id < last_id]
    song_post_ids = [post.id for post in song_posts if post.id < last_id]

    text_posts = Post.objects.filter(user_id__in=follows + [request.user.id]).exclude(id__in=song_post_ids)
    text_posts = [post for post in text_posts if post.id < last_id]

    posts = set().union(text_posts, song_posts)

    # Serialize each post
    posts = [SongPostSerializer(post).data if hasattr(post, 'spotify_uri') else PostSerializer(post).data for post in posts][0:5]

    return Response(posts);

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
