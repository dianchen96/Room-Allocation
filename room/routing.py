from channels.routing import route
from .consumers import group_receive, group_signin

channel_routing = [
    # route("websocket.connect", group_add),
    route("websocket.receive", group_signin, path=r'^/room/case/(?P<case_name>.*)/$'),
    route("websocket.receive", group_receive, path=r'^/room/alloc/(?P<case_name>.*)/$'),
    # route("websocket.disconnect", group_disconnect, path=r'^/room/case/(?P<case_name>.*)/$'),
    # route("http.request", test),
]