
var nextEntry = {
	"airline" : "American Airlines",
	"cost" : "79",
	"destination" : "JFK International, NY",
	"departureTime" : "6:15PM, Oct 1, 2016"
};

function scrollToNextEntry() {
	console.log(nextEntry);

	$('.right-box').animate({
		opacity: 0,
		marginLeft: '-300px'
	}, 'slow', 'swing', function() {
		$(this).remove();
		$('<div class="right-box">' +
			'<div class="field">' +
				'<h1>$' + nextEntry["cost"] + '</h1><br>' +
					'<h3>' +
						'<div class="col-sm-6 right-align">To</div><div class="col-sm-6 left-align">' + nextEntry["destination"] + '</div><br>' +
						'<div class="col-sm-6 right-align">Departing</div><div class="col-sm-6 left-align">' + nextEntry["departureTime"] + '</div><br>' +
						'<div class="col-sm-6 right-align">Airline</div><div class="col-sm-6 left-align">' + nextEntry["airline"] + '</div><br>' +
						'<div class="col-sm-6 right-align">Type</div><div class="col-sm-6 left-align">Single flight</div><br>' +
					'</h3>' +
			'</div>' +
			'<div class="field">' +
				'<button class="bookButton"><h4>BOOK</h4></button>' +
				'<button class="nextButton" onClick="scrollToNextEntry()"><h4>NEXT</h4></button>' +
			'</div>' +
	    '</div>').appendTo(".info-container");
	});
}