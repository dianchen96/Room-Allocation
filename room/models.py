from __future__ import unicode_literals

import datetime
from django.db import models
from django.core.cache import cache
from django.conf import settings

from jsonfield import JSONField

class Case(models.Model):
	name = models.CharField(max_length=200, primary_key=True)
	created_date = models.DateTimeField(default=datetime.datetime.now, blank=True)
	img = models.ImageField(default=None)
	rent = models.IntegerField(default=0)

	def __unicode__(self):
		return "{}, {}".format(self.name, self.created_date)

class Room(models.Model):
	case = models.ForeignKey(Case, on_delete=models.CASCADE)
	name = models.CharField(max_length=200)

	def __unicode__(self):
		return self.name
		

class Allocation(models.Model):
	case = models.OneToOneField(Case, on_delete=models.CASCADE, primary_key=True)
	is_finished = models.BooleanField(default=False)

	room_to_price = JSONField(default={})
	group_to_choice = JSONField(default={})

	def is_ready(self):
		groups = Group.objects.filter(case=self.case)
		return all(map(lambda group: group.is_online(), groups))

	def get_groups(self):
		return Group.objects.filter(case=self.case)

	def __init__(self, case_name, *args, **kwargs):
		super(Allocation, self).__init__(*args, **kwargs)
		self.case = Case.objects.get(pk=case_name)

	def __unicode__(self):
		return "Allocation for {}".format(self.case)





class Group(models.Model):
	case = models.ForeignKey(Case, on_delete=models.CASCADE)
	name = models.CharField(max_length=200)
	num_of_renters = models.IntegerField(default=1)

	def last_seen(self):
		return cache.get('seen_group_%s' % self.name)

	def is_online(self):
		if self.last_seen():
			now = datetime.datetime.now()
			if now > self.last_seen() + datetime.timedelta(\
						seconds=settings.USER_ONLINE_TIMEOUT):
				return False
			else:
				return True
		else:
			return False

	def login(self, user):
		now = datetime.datetime.now()
		cache.set('seen_group_%s' % (self.name), now, settings.USER_LASTSEEN_TIMEOUT)

	def __unicode__(self):
		return self.name
   