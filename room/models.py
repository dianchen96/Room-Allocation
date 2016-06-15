from __future__ import unicode_literals

import datetime
import pickle
from django.db import models
from django.conf import settings
from algo import Simplex



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
	price = models.IntegerField(default=0)

	def __unicode__(self):
		return self.name


class Group(models.Model):
	case = models.ForeignKey(Case, on_delete=models.CASCADE)
	name = models.CharField(max_length=200)
	num_of_renters = models.IntegerField(default=1)
	is_online = models.BooleanField(default=False)
	is_ready = models.BooleanField(default=False)

	def __unicode__(self):
		return self.name

	def login(self):
		self.is_online = True
		self.save()

	def ready(self):
		self.is_ready = True
		self.save()

	def logout(self):
		self.is_online = False
		self.is_ready = False
		self.save()


class Allocation(models.Model):
	case = models.OneToOneField(Case, on_delete=models.CASCADE, primary_key=True)
	channels = models.TextField(default=None, null=True)

	is_complete = models.BooleanField(default=False)
	simplex = models.TextField(default=None, null=True)
	# Stored scheme, if allocation has completed
	scheme = models.TextField(default=None, null=True)

	def __init__(self, case_name, *args, **kwargs):
		super(Allocation, self).__init__(*args, **kwargs)
		self.case = Case.objects.get(name=case_name)
		self.channels = pickle.dumps({})
		self.simplex = pickle.dumps(None)

	def __unicode__(self):
		return "Allocation for {}".format(self.case)

	def can_begin(self):
		groups = Group.objects.filter(case=self.case)
		return groups.count() == len(filter(lambda g: g.is_online and g.is_ready, groups))

	def group_number(self):
		return Group.objects.filter(case=self.case).count()

	def add_channel(self, group, channel):
		channels = pickle.loads(self.channels)
		channels[group.name] = channel
		self.channels = pickle.dumps(channels)
		self.save()

	def get_channels(self):
		return pickle.loads(channels)

	def get_channel(self, group):
		channels = pickle.loads(self.channels)
		return channels[group.name]

	def get_current_player(self):
		player_index = self.to_simplex().get_current_player() - 1
		return Group.objects.filter(case=self.case).order_by("name")[player_index]

	def get_current_prices(self):
		simplex = self.to_simplex()
		prices = simplex.get_current_prices()
		total_rent = self.case.rent
		return map(lambda x: x * total_rent, prices)

	def get_precision(self):
		total_rent = self.case.rent
		return total_rent * self.to_simplex().get_precision()

	def current_player_choose(self, room_index):
		'''
		Current player choose a room_index
		'''
		simplex = self.to_simplex()
		new_level = simplex.current_player_choose(room_index)
		self.update(simplex)
		return new_level

	def generate_cuts(self):
		simplex = self.to_simplex()
		player_index = simplex.get_current_player()
		player = Group.objects.filter(case=self.case).order_by("name")[player_index]
		prices = self.get_current_prices()
		return {
			'player': player,
			'prices': prices,
		}

	def get_suggested_division(self):
		return self.to_simplex().get_suggested_division()

	def update(self, simplex):
		'''
		Takes in a simplex object and update
		@terminate: if terminate is true, save division scheme
		'''
		self.simplex = pickle.dumps(simplex)
		self.save()

	def to_simplex(self):
		'''
		Convert itself to a Simplex object 
		'''
		simplex = pickle.loads(self.simplex)
		return simplex