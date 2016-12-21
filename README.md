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

# Setting up from bare server

Avoding pip errors and other dependencies: `sudo apt-get install build-essential autoconf libtool pkg-config python-opengl python-imaging python-pyrex python-pyside.qtopengl idle-python2.7 qt4-dev-tools qt4-designer libqtgui4 libqtcore4 libqt4-xml libqt4-test libqt4-script libqt4-network libqt4-dbus python-qt4 python-qt4-gl libgle3 libmysqlclient-dev python-dev python-virtualenv libxml2 libxml2-dev libxslt1-dev nginx`
`virtualenv venv`
`. venv/bin/activate`
`pip install -r requirements.txt`
`cd /var/apps/spotica/web/scalica/scalica`
Copy settings.deploy.py to settings.py
Configure env variables in bashrc (export DB_PASSWORD= .. export DB_HOST=)
`sudo ufw allow 'Nginx HTTP'`
`cd /etc/nginx/sites-avaliable/`
Edit nginx file
`cd /etc/nginx/sites-enabled/`
`sudo ln -s /etc/nginx/sites-available/spotica /etc/nginx/sites-enabled/spotica`
`sudo systemctl reload nginx`
`cd /var/apps/spotica/web/scalica`
`python manage.py makemigrations micro`
`python manage.py migrate`
`python manage.py runserver` - test that it all works
`mkdir log`
`supervisord` - starts both gunicorn and celery (can stop one or the other if needed)
