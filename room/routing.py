from channels.routing import route
from .consumers import group_add, group_receive, group_disconnect, test

channel_routing = [
    route("websocket.connect", group_add, path=r'^/room/case/(?P<name>.*)/$'),
    route("websocket.receive", group_receive, path=r'^/alloc/(?P<name>.*)/$'),
    route("websocket.disconnect", group_disconnect),
    # route("http.request", test),
]