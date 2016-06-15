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
				print(choice)
				message = {
					'text': {
						'success': True,
						'is_proposal': False,
						'choice': choice,
					}
				}
				player = alloc.get_current_player()
				channels = get_channel(case.name, player.name)
				channels.send(message)
		else:
			# Make sure it is sent by current player
			if alloc.get_curren_player().name == data['group_name']:
				new_level = alloc.current_player_choose(data['choice'])
				if new_level:
					division = alloc.get_suggested_division()
					message = {
						'text': {
							'success': True,
							'is_proposal': True,
							'division': division,
							'precision': alloc.get_precision(),
						},
					}
					channels = get_channels(case.name)
					channel.send(message)
				else:
					choice = alloc.get_current_prices()
					message = {
						'text': {
							'success': True,
							'is_proposal': False,
							'choice': choice,
						}
					}
					player = alloc.get_current_player()
					channels = get_channel(case.name, player.name)
					channels.send(message)


	except ObjectDoesNotExist:
		message = {
			'is_proposal': False,
		}
		message.reply_channel.send(message)


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
	return ChannelGroup("group_%s_%s" % (case_name, group_name))