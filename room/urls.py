from django.conf.urls import url

from . import views

app_name = 'room'
urlpatterns = [
	url(r'^$', views.IndexView.as_view(), name='index'),
	url(r'^about/$', views.about, name='about'),
	url(r'^create-case/$', views.create_case, name='create_case'),
	url(r'^create-room/$', views.create_room, name='create_room'),
	url(r'^create-group/$', views.create_group, name='create_group'),
	url(r'^case/(?P<pk>.*)/$', views.CaseView.as_view(), name='case'),
]