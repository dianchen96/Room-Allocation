from channels.routing import route
from .consumers import group_receive

channel_routing = [
    route("websocket.receive", group_receive, path=r'^/room/case/(?P<case_name>.*)/$'),
]