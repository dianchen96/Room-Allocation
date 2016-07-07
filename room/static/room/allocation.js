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
			"sign_in": true,
			"group_name": group_name,
		};
		window.socket.send(JSON.stringify(message));
	}

	// Render 'waiting for others to sign in' modal 
	$("#waiting_modal").modal();

	// Polling every 0.1s to check response
	var poll = window.setInterval(function() {
		if (success == -1) {
			window.clearInterval(poll);
			window.socket.close();
		} else if (success == 1) {
			// login success, modify websocket listener 
			window.clearInterval(poll);
			// Cache in room name and group name
			get_rooms_groups();
			window.group_name = group_name;
			window.socket.onmessage = get_price_scheme;
			ready_msg = {
				'ready': true,
				'group_name': group_name,
			};
			// Notify server that I am ready 
			window.socket.send(JSON.stringify(ready_msg));
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
	$("#alloc_modal").modal();
	var prices = $("#price_scheme")[0]
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
		var proposal = data.division
		var title = document.createElement("h3");
		title.appendChild(document.createTextNode("A Fair division scheme has come out"));
		var table = document.createElement("table");
		table.className = "pure-table pure-table-striped custom-table";
		var thead = table.createTHead();
		var trow = thead.insertRow(0);
		var tcol1 = trow.insertCell(0);
		var tcol2 = trow.insertCell(1);
		var tcol3 = trow.insertCell(2);
		tcol1.innerHTML = "Group";
		tcol2.innerHTML = "Room";
		tcol3.innerHTML = "Rent";
		var tbody = table.createTBody();
		var row = tbody.insertRow(0);
		for (var i = 0; i < proposal.length; i++) {
			var division = proposal[i];
			var cell1 = row.insertCell(0);
			var cell2 = row.insertCell(1);
			var cell3 = row.insertCell(2);
			cell1.innerHTML = window.groups[i];
			cell2.innerHTML = window.rooms[division.room];
			cell3.innerHTML = division.rent;
		}
		prices.appendChild(table);
		var precision = document.createElement("h3");
		precision.appendChild(document.createTextNode("The precision of this division is " + proposal.precision));
		
		// TODO: To contunue or accept division	

	} else {
		var choices = data.choice;
		for (var i = 0; i < choices.length; i++) {
			// TODO: render elements
			var choice = document.createElement("button");
			choice.className = "pure-button pure-u-1-2 custom-price-button";
			choice.id = "room-" + (i+1).toString();
			var text = document.createTextNode(window.rooms[i]+" with monthly rent $"+choices[i]+" per person");
			choice.appendChild(text);
			prices.appendChild(choice);
			choice.onclick = function(event) {
				event.preventDefault();
				// Notify server the player's choice
				choice_index = parseInt(choice.id.split("-")[1]);
				var message = {
					'group_name': window.group_name,
					'choice': choice_index,
				};
				window.socket.send(JSON.stringify(message));
				$("#waiting_modal").modal();
				$("#alloc_modal").modal("hide");
				return false;
			};
		}
	}
}

function get_rooms_groups() {
	room_names = $(".room-name");
	group_names = $(".group-name");
	window.rooms = room_names.map(function (i, e) {
		return e.innerHTML;
	});
	window.groups = group_names.map(function (i, e) {
		return e.innerHTML;
	});
	window.groups.sort();
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