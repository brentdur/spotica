from django.conf.urls import url, include
from rest_framework import routers
from . import views
from .api.v1.views import UserViewSet

router = routers.DefaultRouter()
router.register(r'users/login', UserViewSet, base_name='login')
router.register(r'users/logout', UserViewSet, base_name='logout')

urlpatterns = [
  url(r'^logout', views.log_out, name='logout'),
  url(r'^login', views.index, name='login'),
  url(r'^$', views.index, name='index'),

  # automatic URL routing for API
  url(r'^api/v1/', include('rest_framework.urls', namespace='rest_framework')),
  url(r'^api/v1/', include(router.urls), name='index'),
]
