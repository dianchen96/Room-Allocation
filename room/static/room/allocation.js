window.case_url = new String(window.location).replace("http", "ws");
window.socket;

/*
	Function triggered by submitting identity form
	Establish a websocket, send group name, and listens to 
	see if successfully added
*/
function try_add() {
	console.log("Submit!");
	var group_e = $("#id_group")[0];
	var group_name = group_e.options[group_e.selectedIndex].text;
	window.socket = new WebSocket(window.case_url);
	var message = {
		"group": group_name,
	};

	var sucsess = 0;
	// Send message to websocket
	window.socket.send(JSON.stringify(message));
	// Wait for response
	window.socket.onmessage = function(message) {
		var data = JSON.parse(message);
		success = data.success? 1: -1;
	};

	// Render 'waiting for others to sign in' modal 
	$("#waiting_modal").modal();

	// Polling every 0.1s to check response
	var poll = window.setInterval(function() {
		if (success == -1) {
			// login failed, close websocket and render error message
			window.clearInterval(poll);
			window.socket.close();
			// TODO: render error message
		} else if (sucess == 1) {
			// login success, modify websocket listener 
			window.clearInterval(poll);
			window.socket.onmessage = get_price_scheme;
		} 
	}, 100);
}

/*
	Parse price scheme message and render it onto page.
	This function only gets called as socket.onmessage
*/
function get_price_scheme(message) {
	var data = JSON.parse(message);
	// TODO: render elements on page


}

$(document).ready(function() {
	// // Setup waiting spinner
	// var opts = {
	// 	  lines: 13 // The number of lines to draw
	// 	, length: 6 // The length of each line
	// 	, width: 7 // The line thickness
	// 	, radius: 12 // The radius of the inner circle
	// 	, scale: 1 // Scales overall size of the spinner
	// 	, corners: 1 // Corner roundness (0..1)
	// 	, color: '#000' // #rgb or #rrggbb or array of colors
	// 	, opacity: 0.35 // Opacity of the lines
	// 	, rotate: 0 // The rotation offset
	// 	, direction: 1 // 1: clockwise, -1: counterclockwise
	// 	, speed: 1 // Rounds per second
	// 	, trail: 60 // Afterglow percentage
	// 	, fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
	// 	, zIndex: 2e9 // The z-index (defaults to 2000000000)
	// 	, className: 'spinner' // The CSS class to assign to the spinner
	// 	, top: '50%' // Top position relative to parent
	// 	, left: '50%' // Left position relative to parent
	// 	, shadow: false // Whether to render a shadow
	// 	, hwaccel: false // Whether to use hardware acceleration
	// 	, position: 'absolute' // Element positioning
	// }
	// var spinner = new Spinner(opts).spin();
	// $("#spinner").appendChild(spinner.el);

	// Setup identity submit button
	// $("#confirm_idetnity").onsubmit = function(event) {
	// 	event.preventDefault();
	// 	try_add();
	// 	return false;
	// };\\
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