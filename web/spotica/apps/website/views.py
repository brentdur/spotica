from django.contrib.auth import authenticate, logout
from django.contrib.auth.models import User
from django.shortcuts import render, redirect

# Create your views here.
def index(request):
    # Hacky AF: remove
    return render(request, "index.html")

def login(request):
    message = None

    # Is user already logged in?
    if request.user.is_authenticated():
        return redirect('index')

    if request.method == 'POST':
        # Is there a matching user for these credentials?
        username = request.POST['username'].lower()
        password = request.POST['password']

        user = authenticate(username=username, password=password)

        if user:
            if next:
                return redirect(next)
            else:
                return redirect('index')
        else:
            message = 'There were no matching users for that username and password.'

        return {
            'success': message is None,
            'message': message,
        }

    return render(request, "index.html")

def log_out(request):
    logout(request)
    return redirect('index')
