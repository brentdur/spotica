"""
Django settings for scalica project.

Generated by 'django-admin startproject' using Django 1.8.1.

For more information on this file, see
https://docs.djangoproject.com/en/1.8/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/1.8/ref/settings/
"""

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/1.8/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'o2m&25i%nxda=w1t7e93nl^1-g%4yw496+$%(hi=fp6x7)8dn!'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []

LOGIN_URL = '/login/'
LOGIN_REDIRECT_URL = '/home/'

# Application definition

INSTALLED_APPS = (
    'micro', # Keep this first, so templates are first found in this app.
    'utils',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.humanize',
    'debug_toolbar',

    # Third-party apps
    'rest_framework',
)

MIDDLEWARE_CLASSES = (
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.auth.middleware.SessionAuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'debug_toolbar.middleware.DebugToolbarMiddleware',
)

DEBUG_TOOLBAR_CONFIG = {
    'DISABLE_PANELS': [],
    'SHOW_TOOLBAR_CALLBACK': 'utils.misc.custom_show_toolbar',
    'SHOW_TEMPLATE_CONTEXT': True,
}

DEBUG_TOOLBAR_PANELS = (
#    'debug_toolbar.panels.versions.VersionsPanel',
    'debug_toolbar.panels.timer.TimerPanel',
#    'debug_toolbar.panels.settings.SettingsPanel',
#    'debug_toolbar.panels.headers.HeadersPanel',
    'debug_toolbar.panels.request.RequestPanel',
    'debug_toolbar.panels.sql.SQLPanel',
#    'debug_toolbar.panels.templates.TemplatesPanel',
#    'debug_toolbar.panels.staticfiles.StaticFilesPanel',
#    'debug_toolbar.panels.cache.CachePanel',
#    'debug_toolbar.panels.signals.SignalsPanel',
#    'debug_toolbar.panels.logging.LoggingPanel',
#    'debug_toolbar.panels.redirects.RedirectsPanel',
)

ROOT_URLCONF = 'scalica.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'scalica.wsgi.application'


# Database
DATABASES = {
  'default': {
    'ENGINE': 'django.db.backends.mysql',
    'OPTIONS': {
      'read_default_file': os.path.join(BASE_DIR, '..', '..', 'db', 'my.cnf'),
    },
  }
}

# Database routers go here:
# DATABASE_ROUTERS = ['micro.routers.UserRouter']

# Our API
REST_FRAMEWORK = {
    'PAGE_SIZE': 50,
    'DEFAULT_AUTHENTICATION_CLASSES': (
        # First try OAuth. Then see if logged in.
        'rest_framework.authentication.SessionAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
    ),
}

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'EST'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
STATIC_URL = '/static/'

# Logging
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'file': {
            'level': 'DEBUG',
            'class': 'logging.FileHandler',
            'filename': '/tmp/db.debug.log',
        },
    },
    'loggers': {
        'django.db.backends': {
            'handlers': ['file'],
            'level': 'DEBUG',
            'propagate': True,
        },
    },
}
