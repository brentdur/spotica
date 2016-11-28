from django.shortcuts import render, redirect

# Create your views here.
def index(request):
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

def signup(request):
    # TODO: make a profile here

    return render(request, "index.html")
