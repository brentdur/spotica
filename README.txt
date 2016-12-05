First installation:

Install required packages.
$ sudo apt-get update; sudo apt-get install mysql-server libmysqlclient-dev python-dev python-virtualenv
(Set a mysql root password)

$ ./first_install.sh

Install the proper databases
$ cd db
$ ./install_db.sh
(Will ask for the mysql root password configured above).
$ cd ..

Sync the database
$ source ./env/bin/activate
$ cd web/scalica
$ python manage.py makemigrations micro
$ python manage.py migrate


# After the first installation, from the project's directory
Run the server:
$ source ./env/bin/activate
$ cd web/scalica
$ python manage.py runserver

Access the site at http://localhost:8000/micro


# Spotica Specific

## Celery
Celery is a distributed task runner and (with celery-beat) a task scheduler. It's used to async calculate the user and global sentiments. Celery requires **redis**.

To start celery: `cd web/scalica` `celery -A scalica worker -B -l info --concurrency=4`

This starts celery, connected to scalica, starting a worker as well (with concurrency 4), with loglevel set to INFO and starting celery-beat.
