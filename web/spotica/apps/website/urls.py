from django.conf.urls import url, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()

urlpatterns = [
  url(r'^$', views.index, name='index'),

  # automatic URL routing for API
  url(r'^api/v1/', include('rest_framework.urls', namespace='rest_framework')),
  url(r'^api/v1/', include(router.urls), name='index'),
]
