from __future__ import unicode_literals

from django.db import models
from jsonfield import JSONField
from datetime import datetime
from django.core.cache import cache
from django.conf import settings

class Case(models.Model):
	name = models.CharField(max_length=200, primary_key=True)
	created_date = models.DateTimeField(default=datetime.now, blank=True)
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
	case = models.ForeignKey(Case, on_delete=models.CASCADE)
	is_finished = models.BooleanField(default=False)

	room_to_price = JSONField(default={})
	group_to_choice = JSONField(default={})

	def is_ready(self):
		try:
			groups = Group.objects.filter(case=self.case)
			return all(map(is_online, groups))
		except ObjectDoesNotExist:
			return False

	def get_groups(self):
		return Group.objects.filter(case=self.case)

	def __init__(self, case, *args, **kwargs):
		super(Allocation, self).__init__(*args, **kwargs)
		self.case = case

	def __unicode__(self):
		return "Price schema: {}\nGroup's choice: {}".format(self.case, self.room_to_price, \
			self.group_to_choice)





class Group(models.Model):
	case = models.ForeignKey(Case, on_delete=models.CASCADE)
	name = models.CharField(max_length=200)
	num_of_renters = models.IntegerField(default=1)

	def is_cached(self):
		return cache.get('seen_group_%s' % self.name)

	def is_online(self):
		if self.is_cached():
			now = datetime.now()
			if now > self.last_seen() + datetime.timedelta(\
						seconds=settings.USER_ONLINE_TIMEOUT):
				return False
			else:
				return True
		else:
			return False

	def login(self, user):
		now = datetime.now()
		cache.set('seen_group_%s' % (self.name), now, settings.USER_LASTSEEN_TIMEOUT)
		cache.set('seen_user_%s' % (user.user_name), now, settings.USER_LASTSEEN_TIMEOUT)

	def __unicode__(self):
		return self.name
   