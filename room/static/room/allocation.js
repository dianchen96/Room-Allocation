window.case_url = new String(window.location).replace("http", "ws");
window.alloc_url = new String(window.case_url).replace("case", "alloc");
window.socket;

/*
	Function triggered by submitting identity form
	Establish a websocket, send group name, and listens to 
	see if successfully added
*/
function try_add() {
	var group_e = $("#id_group")[0];
	var group_name = group_e.options[group_e.selectedIndex].text;
	window.socket = new WebSocket(window.case_url);

	var success = 0;
	window.socket.onmessage = function(message) {
		var data = JSON.parse(message.data);
		success = data.success? 1: -1;
	};

	// Wait for establishing connection
	window.socket.onopen = function(event) {
		// Send message to websocket
		var message = {
			"group_name": group_name,
		};
		window.socket.send(JSON.stringify(message));
	}

	// Render 'waiting for others to sign in' modal 
	$("#waiting_modal").modal();

	// Polling every 0.1s to check response
	var poll = window.setInterval(function() {
		if (success == -1) {
			// login failed, close websocket and render error message
			window.clearInterval(poll);
			window.socket.close();
			// TODO: render error message
		} else if (success == 1) {
			// login success, modify websocket listener 
			window.clearInterval(poll);
			// Cache in room name
			window.rooms = get_room_names();
			window.socket.onmessage = get_price_scheme;
		} 
	}, 100);
}

/*
	Parse price scheme message and render it onto page.
	This function only gets called as socket.onmessage
*/
function get_price_scheme(message) {
	var data = JSON.parse(message.data);
	// TODO: render elements on page
	$("#waiting_modal").modal("hide");
	var prices = $("price_scheme")[0]
	while (prices.firstChild) {
		prices.removeChild(prices.firstChild);
	}

	if (!data.success) {
		var err_msg = document.createElement("p");
		err_msg.className = "err-msg";
		err_msg.appendChild(document.createTextNode("There is an server side error occurred."));
		return;		
	}

	var is_proposal = data.is_proposal;
	if (is_proposal) {

	} else {
		var choice = data.choice;
		for (var i = 0; i < choice.length; i++) {
			// TODO: render elements
		}
	}
}

function get_room_names() {
	room_names = $(".room-name");
	return room_names.map(function (i, e) {
		return e.innerHTML;
	});
}


$(document).ready(function() {
	// Setup waiting spinner
	var opts = {
		  lines: 7 // The number of lines to draw
		, length: 6 // The length of each line
		, width: 3 // The line thickness
		, radius: 7 // The radius of the inner circle
		, scale: 1 // Scales overall size of the spinner
		, corners: 1 // Corner roundness (0..1)
		, color: '#000' // #rgb or #rrggbb or array of colors
		, opacity: 0.35 // Opacity of the lines
		, rotate: 0 // The rotation offset
		, direction: 1 // 1: clockwise, -1: counterclockwise
		, speed: 1 // Rounds per second
		, trail: 60 // Afterglow percentage
		, fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
		, zIndex: 2e9 // The z-index (defaults to 2000000000)
		, className: 'spinner' // The CSS class to assign to the spinner
		, top: '50%' // Top position relative to parent
		, left: '50%' // Left position relative to parent
		, shadow: false // Whether to render a shadow
		, hwaccel: false // Whether to use hardware acceleration
		, position: 'absolute' // Element positioning
	};
	var spinner = new Spinner(opts).spin();
	$("#spinner")[0].appendChild(spinner.el);

	// Setup identity submit button
	$("#confirm_identity")[0].onclick = function(event) {
		try_add();
		return false;
	};

	// Setup cancel allocation button 
	$("#cancel_alloc").click(function() {
		$("#waiting_modal").modal("hide");
		window.socket.close();
	});
});