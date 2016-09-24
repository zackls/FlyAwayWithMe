var isRoundTrip = true;

function scrollToNextEntry() {
	var infoContainer = document.getElementById("flightInfoContainer");
	var nextEntry = {
		"cost" : Number(infoContainer.getAttribute("data-cost")).toFixed(2),
		"destination" : infoContainer.getAttribute("data-destination"),
		"departureTime" : formatDate(infoContainer.getAttribute("data-departureTime")),
		"returnTime" : formatDate(infoContainer.getAttribute("data-returnTime")),
	}

	$('.right-box').animate({
		opacity: 0,
		marginLeft: '-200px'
	}, 'medium', 'swing', function() {
		$(this).remove();
		$('<div class="right-box">' +
			'<div class="field">' +
				'<h1>$' + nextEntry["cost"] + '</h1><br>' +
					'<h3>' +
						'<div class="col-sm-5 right-align">To</div><div class="col-sm-7 left-align">' + nextEntry["destination"] + '</div><br>' +
						'<div class="col-sm-5 right-align">Departing</div><div class="col-sm-7 left-align">' + nextEntry["departureTime"] + '</div><br>' +
						(isRoundTrip ? '<div class="col-sm-5 right-align">Returning</div><div class="col-sm-7 left-align">' + nextEntry["returnTime"] + '</div><br>' : '') +
						//'<div class="col-sm-5 right-align">Airline</div><div class="col-sm-7 left-align">' + nextEntry["airline"] + '</div><br>' +
						'<div class="col-sm-5 right-align">Type</div><div class="col-sm-7 left-align">' + (isRoundTrip ? 'Round trip' : 'Single flight') + '</div><br>' +
					'</h3>' +
			'</div>' +
			'<div class="field">' +
				'<button class="bookButton"><h4>BOOK</h4></button>' +
				'<button class="nextButton" onClick="scrollToNextEntry()"><h4>NEXT</h4></button>' +
			'</div>' +
	    '</div>').appendTo(".info-container");
	});
}

function formatDate(date) {
	var d = new Date(date);
	var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	return days[d.getDay()] + ", " + months[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear() + ", " + d.getHours() + ":" + d.getMinutes() + (d.getHours() < 12 ? "AM" : "PM");
}