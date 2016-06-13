from django.core.exceptions import ObjectDoesNotExist
from channels import Group as ChannelGroup
from .models import Case, Allocation, Group

def group_add(message, name):
	ChannelGroup("case-%s" % name).add(message.reply_channel)
	

def group_receive(message, name):
	# try:
	# 	case = Case.objects.get(pk=name)
	# 	if message.reply_channel not in ChannelGroup("case-%s" % name).all():
	# 		ChannelGroup("case-%s" % name).add(message.reply_channel)
	# 		message.reply_channel.send({
	# 			'success': True,
	# 			'msg': 'You signed in as %s' % message['group'],
	# 		})
	# 	else:
	# 		# Send error message to reply channel
	# 		message.reply_channel.send({
	# 			'success': False,
	# 			'msg': 'Group %s has already signed in, please try again' % message['group'],
	# 		})

	# except ObjectDoesNotExist:
	# 	# Send error message to reply channel
	# 	message.reply_channel.send({
	# 		'success': False,
	# 		'msg': 'An internal error has occured, please try again later',
	# 	})
	pass
	

def group_disconnect(message, name):
	ChannelGroup("case-%s" % name).discard(message.reply_channel)

	
def test(message):
	response = HttpResponse("Hello world! You asked for %s" % message.content['path'])
	for chunk in AsgiHandler.encode_response(response):
		message.reply_channel.send(chunk)