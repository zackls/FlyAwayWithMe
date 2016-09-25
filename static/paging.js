var isRoundTrip = true;

var offers;
var currentListIndex;

function scrollToNextEntry() {
	if (!offers) {
		offers = JSON.parse((new String(document.getElementById("flightInfoContainer").getAttribute("data-orderedOffers"))).replace(/: u/g, ': ').replace(/\'/g, '"'));
		currentListIndex = 0;
	}

	var info = offers[currentListIndex];
	var originalDeparture = info["outDate"];
	var originalReturn = info["inDate"];
	var nextEntry = {
		"cost" : Number(info["minPrice"]).toFixed(2),
		"origin" : info["home"],
		"destination" : info["visit"],
		"departureTime" : formatDate(originalDeparture),
		"returnTime" : formatDate(originalReturn)
	};

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
				// '<button class="bookButton" action=https://www.expedia.com/Flights-Search?trip=roundtrip&leg1=from:' + nextEntry["origin"] + ',to:' + nextEntry["destination"] + ',departure:' + originalDeparture + 'TANYT&leg2=from:' + nextEntry["destination"] + ',to:' + nextEntry["origin"] + ',departure:' + originalReturn + 'TANYT&passengers=children:0,adults:' + '1,seniors:0,infantinlap:Y&mode=search' + '><h4>BOOK</h4></button>' +
				'<button class="bookButton"><h4>BOOK</h4></button>' +
				'<button class="nextButton" onClick="scrollToNextEntry()"><h4>NEXT</h4></button>' +
			'</div>' +
	    '</div>').appendTo(".info-container");
	});

	currentListIndex++;
}

function formatDate(date) {
	if (date) {
		var d = new Date(date);
		var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
		var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
		return days[d.getDay()] + ", " + months[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear() + ", " + d.getHours() + ":" + d.getMinutes() + (d.getHours() < 12 ? "AM" : "PM");
	} else {
		return undefined;
	}
}