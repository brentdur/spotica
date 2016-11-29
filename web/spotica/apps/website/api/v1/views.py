from django.contrib.auth import authenticate, logout
from django.contrib.auth.models import User
from rest_framework import viewsets
from rest_framework.decorators import list_route, detail_route
from rest_framework.response import Response
from .serializers import UserSerializer

class UserViewSet(viewsets.ModelViewSet):
  """
  API endpoints for users to be created
  """
  queryset = User.objects.all()
  serializer_class = UserSerializer

  @list_route(methods=['post'])
  def login(self, request):
    username = request.POST['username'].lower()
    password = request.POST['password']
    status = 200;

    existing_user = User.authenticate(username=username, password=password)

    if existing_user is None:
      new_user = User.create(username=username, password=password)
      new_user.save()

    # TODO: make a profile for the user

    return Response(status=status)

  @list_route(methods=['get'])
  def logout(self, request):
    logout(request)
