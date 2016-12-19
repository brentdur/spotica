from __future__ import absolute_import, unicode_literals
import os
from datetime import timedelta
from celery import Celery

# set the default Django settings module for the 'celery' program.
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'scalica.settings')

from django.conf import settings  # noqa

app = Celery('scalica')

# Using a string here means the worker don't have to serialize
# the configuration object to child processes.
# - namespace='CELERY' means all celery-related configuration keys
#   should have a `CELERY_` prefix.
app.config_from_object('django.conf:settings', namespace='CELERY')

# Load task modules from all registered Django app configs.
app.autodiscover_tasks(lambda: settings.INSTALLED_APPS)

app.conf.beat_schedule = {
    'run_global_sentiment_every_hour': {
        'task': 'spotica.tasks.update_global_timeseries',
        'schedule': timedelta(hours=1)
    }
}