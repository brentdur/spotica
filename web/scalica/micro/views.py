from django.contrib.auth import logout, login, authenticate
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.utils import timezone
from operator import attrgetter
from itertools import chain
from .models import Following, Post, FollowingForm, PostForm, MyUserCreationForm, SongPost
import json
import io

from django.conf import settings

from spotica import caching


# Anonymous views
def index(request):
    if request.user.is_authenticated():
        return home(request)
    else:
        return anon_home(request)


def anon_home(request):
    return render(request, 'micro/public.html')


def stream(request, user_id):
    # See if to present a 'follow' button
    form = None

    if request.user.is_authenticated() and request.user.id != int(user_id):
        try:
            f = Following.objects.get(follower_id=request.user.id,
                                      followee_id=user_id)
        except Following.DoesNotExist:
            form = FollowingForm

    # Get the user's posts
    user = User.objects.get(pk=user_id)
    post_list = Post.objects.filter(user_id=user_id).order_by('-pub_date')
    paginator = Paginator(post_list, 10)
    page = request.GET.get('page')

    try:
        posts = paginator.page(page)
    except PageNotAnInteger:
        # If page is not an integer, deliver first page.
        posts = paginator.page(1)
    except EmptyPage:
        # If page is out of range (e.g. 9999), deliver last page of results.
        posts = paginator.page(paginator.num_pages)

    follows = [o.followee_id for o in Following.objects.filter(follower_id=request.user.id)]

    song_posts = SongPost.objects.filter(user=user_id)
    song_post_ids = [post.id for post in song_posts]

    print("length = "+ str(len(song_posts)))

    post_list = sorted(chain(song_posts),key=attrgetter('pub_date'),reverse=True)
    print ("post list length = " + str(len(post_list)))

    context = {
        # Only show 15 of the posts
        'post_list': post_list[0:15],
        'posts': post_list[0:15],
        'post_form': PostForm,
        'file': json.dumps(caching.user_sentiment_json_url(request.user.id)),
        'stream_user': user,
        'form': form
        }

    #
    # context = {
    #     'posts': posts,
    # }
    return render(request, 'micro/stream.html', context)


def register(request):
    if request.method == 'POST':
        form = MyUserCreationForm(request.POST)
        new_user = form.save(commit=True)
        # Log in that user.
        user = authenticate(username=new_user.username,
                            password=form.clean_password2())
        print(user.username)
        # create unique JSON file to store user sentiment
        name_of_json_file = "sentiment-" + user.username + ".json"
        with io.FileIO(name_of_json_file, "w") as file:
            file.write("[]")
        if user is not None:
            login(request, user)
        else:
            raise Exception
        return home(request)
    else:
        form = MyUserCreationForm
    return render(request, 'micro/register.html', {'form': form})

# Authenticated views
#####################


@login_required
def home(request):
    '''List of recent posts by people I follow and myself'''
    try:
        my_post = Post.objects.filter(
            user=request.user).order_by('-pub_date')[0]
    except IndexError:
        my_post = None

    follows = [o.followee_id for o in Following.objects.filter(
        follower_id=request.user.id)]

    # Get a list of text and songs posts, sorted by date
    song_posts = SongPost.objects.filter(
        user_id__in=follows + [request.user.id])
    song_post_ids = [post.id for post in song_posts]
    text_posts = Post.objects.filter(
        user_id__in=follows + [request.user.id]).exclude(id__in=song_post_ids)

    post_list = sorted(
        chain(set().union(text_posts, song_posts)),
        key=attrgetter('pub_date'),
        reverse=True)

    context = {
        'post_list': post_list,
        'my_post': my_post,
        'post_form': PostForm
    }

    return render(request, 'micro/home.html', context)

# Allows to post something and shows my most recent posts.


@login_required
def post(request):
    if request.method == 'POST':
        form = PostForm(request.POST)
        new_post = form.save(commit=False)
        new_post.user = request.user
        new_post.pub_date = timezone.now()
        new_post.save()
        return home(request)
    else:
        form = PostForm
    return render(request, 'micro/post.html', {'form': form})


@login_required
def follow(request):
    if request.method == 'POST':
        form = FollowingForm(request.POST)
        new_follow = form.save(commit=False)
        new_follow.follower = request.user
        new_follow.follow_date = timezone.now()
        new_follow.save()
        return home(request)
    else:
        form = FollowingForm
    return render(request, 'micro/follow.html', {'form': form})

@login_required
def find_users(request):

    return render(request, 'micro/find_users.html', { 'users': User.objects.all })
@login_required
def global_sentiment(request):
    media_url = json.dumps(caching.global_sentiment_json_url())
    return render(request, 'micro/global_sentiment.html', {'file': media_url})
