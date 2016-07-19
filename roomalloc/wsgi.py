"""
WSGI config for roomalloc project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/1.9/howto/deployment/wsgi/
"""

import os, sys

sys.path.insert(0, '/opt/python/current/app')

from django.core.wsgi import get_wsgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "roomalloc.settings")

application = get_wsgi_application()
