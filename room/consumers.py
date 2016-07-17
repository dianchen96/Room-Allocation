import json
import pickle
from django.core.exceptions import ObjectDoesNotExist
from channels import Group as ChannelGroup
from .models import Case, Allocation, Group
from .algo import Simplex

from channels.auth import channel_session_user_from_http


@channel_session_user_from_http
def group_receive(message, case_name):
	data = json.loads(message['text'])
	try:
		case = Case.objects.get(pk=case_name)
		group = Group.objects.get(case=case, name=data['group_name'])
		alloc = Allocation.objects.get(case=case)
		if "sign_in" in data:
			add_channel(case.name, group.name, message.reply_channel)
			group.login()
			message.reply_channel.send({
				'text': json.dumps({
					'success': True,
				}),
			})
			# If all groups are signed in, create simplex and send the first message
		elif "ready" in data:
			print("%s is ready" % group)
			group.ready()
			if alloc.can_begin():
				simplex = Simplex(alloc.group_number())
				alloc.update(simplex)
				choice = alloc.get_current_prices()
				player = alloc.get_current_player()
				channels = get_channel(case.name, player.name)
				channels.send({
					'text': json.dumps({
						'success': True,
						'is_proposal': False,
						'choice': choice,
					}),
				})

		elif "vote" in data:
			# Collect vote from groups: whether to archive division or continue
			print("%s voted" % group.name)
			group.vote(data["vote"])
			if alloc.is_finished_voting():
				if alloc.can_archive():
					print("Start archive %s" % case.name)
					alloc.archive_division()
				else:
					# Continue dividing
					alloc.clear_voting()
					choice = alloc.get_current_prices()
					player = alloc.get_current_player()
					channels = get_channel(case.name, player.name)
					channels.send({						
						'text': json.dumps({
							'success': True,
							'is_proposal': False,
							'choice': choice,
						}),
					})

		else:
			# Make sure it is sent by current player
			if alloc.get_current_player().name == group.name:
				print("%s chosed %s" % (group, data['choice']))
				new_level = alloc.current_player_choose(data['choice'])
				if new_level:
					division = alloc.get_suggested_division()
					channels = get_channels(case.name)
					channels.send({
						'text': json.dumps({
							'success': True,
							'is_proposal': True,
							'division': division,
							'precision': alloc.get_precision(),
						}),
					})
				else:
					choice = alloc.get_current_prices()
					player = alloc.get_current_player()
					channels = get_channel(case.name, player.name)
					channels.send({						
						'text': json.dumps({
							'success': True,
							'is_proposal': False,
							'choice': choice,
						}),
					})


	except ObjectDoesNotExist:
		message.reply_channel.send({
			'text': json.dumps({
				'success': False,
			}),
		})


def add_channel(case_name, group_name, channel):
	case_name = case_name.replace(" ", "")
	group_name = group_name.replace(" ", "")
	group_name = group_name.replace("&", "")
	ChannelGroup("case_%s" % case_name).add(channel)
	ChannelGroup("group_%s_%s" % (case_name, group_name)).add(channel)

def get_channels(case_name):
	case_name = case_name.replace(" ", "")
	return ChannelGroup("case_%s" % case_name)

def get_channel(case_name, group_name):
	case_name = case_name.replace(" ", "")
	group_name = group_name.replace(" ", "")
	group_name = group_name.replace("&", "")
	return ChannelGroup("group_%s_%s" % (case_name, group_name))