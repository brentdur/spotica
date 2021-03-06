from django.contrib.auth import views as auth_views
from django.conf.urls import include, url
from . import views
from rest_framework import routers
from micro.api.v1.views import PostViewSet, SongPostViewSet

from django.conf import settings
from django.conf.urls.static import static

# Fill out API routes
router = routers.DefaultRouter()
router.register(r'posts', PostViewSet, base_name='posts')
router.register(r'song_posts', SongPostViewSet, base_name='song_posts')

urlpatterns = [
    url(r'^$', views.index, name='index'),

    url(r'^home/$', views.home, name='home'),
    url(r'^stream/(?P<user_id>[0-9]+)/$', views.stream, name='stream'),
    url(r'^post/$', views.post, name='post'),
    url(r'^users/$', views.find_users, name='users'),
    url(r'^follow/$', views.follow, name='follow'),
    url(r'^register/$', views.register, name='register'),
    url(r'^global_sentiment/$', views.global_sentiment, name='global_sentiment'),

    # Automatic URL routing for our API
    url(r'^api/v1/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^api/v1/', include(router.urls)),

    url('^', include('django.contrib.auth.urls'))
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
