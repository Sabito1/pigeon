release: python manage.py makemigrations
release: python manage.py migrate --run-syncdb
web: daphne pigeon.asgi:application --port $PORT --bind 0.0.0.0 -v2
worker: python manage.py runworker --settings=pigeon.settings -v2