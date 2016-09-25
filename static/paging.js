var isRoundTrip = true;

var offers;
var currentListIndex = -1;

function scrollToEntry(forward) {
	if (!offers) {
		offers = JSON.parse((new String(document.getElementById("flightInfoContainer").getAttribute("data-orderedOffers"))).replace(/: u/g, ': ').replace(/\'/g, '"'));
	}

	console.log(offers);

	currentListIndex = forward ? currentListIndex + 1 : currentListIndex - 1

	var info = offers[currentListIndex];
	var nextEntry = {
		"cost" : Number(info["minPrice"]).toFixed(2),
		"origin" : info["home"],
		"destination" : info["visit"],
		"departureTime" : info["outDate"],
		"departureLine" : info["outAirLine"],
		"returnTime" : info["inDate"],
		"returnLine" : info["inAirLine"]
	};

	var isFirstAnimation = document.getElementById('roundTripInfo');

	$(isFirstAnimation ? '.right-box' : '.main-info').animate({
		opacity: 0,
		marginLeft: forward ? '-200px' : '200px'
	}, 'medium', 'swing', function() {
		$(this).remove();
		if (isFirstAnimation) {
			$('<div class="right-box">' +
				'<div class="field main-info">' +
					'<h1>$' + nextEntry["cost"] + '</h1><br>' +
					'<h3>' +
						'<div class="col-sm-5 right-align">To</div><div class="col-sm-7 left-align">' + nextEntry["destination"] + '</div><br>' +
						'<div class="col-sm-5 right-align">Departure Time</div><div class="col-sm-7 left-align">' + formatDateLong(nextEntry["departureTime"]) + '</div><br>' +
						'<div class="col-sm-5 right-align">Departure Airline</div><div class="col-sm-7 left-align">' + airlineNameForCode(nextEntry["departureLine"]) + '</div><br>' +
						(isRoundTrip ? '<div class="col-sm-5 right-align">Return Time</div><div class="col-sm-7 left-align">' + formatDateLong(nextEntry["returnTime"]) + '</div><br>' : '') +
						(isRoundTrip ? '<div class="col-sm-5 right-align">Return Airline</div><div class="col-sm-7 left-align">' + airlineNameForCode(nextEntry["returnLine"]) + '</div><br>' : '') +
						'<div class="col-sm-5 right-align">Type</div><div class="col-sm-7 left-align">' + (isRoundTrip ? 'Round trip' : 'Single flight') + '</div><br>' +
					'</h3>' +
				'</div>' +
				'<div class="field">' +
					'<button class="prevButton" onClick="scrollToEntry(false)"><h4>< PREV</h4></button>' +
					// '<button class="bookButton" action=https://www.expedia.com/Flights-Search?trip=roundtrip&leg1=from:' + nextEntry["origin"] + ',to:' + nextEntry["destination"] + ',departure:' + originalDeparture + 'TANYT&leg2=from:' + nextEntry["destination"] + ',to:' + nextEntry["origin"] + ',departure:' + originalReturn + 'TANYT&passengers=children:0,adults:' + '1,seniors:0,infantinlap:Y&mode=search' + '><h4>BOOK</h4></button>' +
					'<button class="bookButton"><h4>BOOK</h4></button>' +
					'<button class="nextButton" onClick="scrollToEntry(true)"><h4>NEXT ></h4></button>' +
				'</div>' +
		    '</div>').appendTo(".info-container");
		} else {
			$('<div class="field main-info">' +
				'<h1>$' + nextEntry["cost"] + '</h1><br>' +
				'<h3>' +
					'<div class="col-sm-5 right-align">To</div><div class="col-sm-7 left-align">' + nextEntry["destination"] + '</div><br>' +
					'<div class="col-sm-5 right-align">Departure Time</div><div class="col-sm-7 left-align">' + formatDateLong(nextEntry["departureTime"]) + '</div><br>' +
					'<div class="col-sm-5 right-align">Departure Airline</div><div class="col-sm-7 left-align">' + airlineNameForCode(nextEntry["departureLine"]) + '</div><br>' +
					(isRoundTrip ? '<div class="col-sm-5 right-align">Return Time</div><div class="col-sm-7 left-align">' + formatDateLong(nextEntry["returnTime"]) + '</div><br>' : '') +
					(isRoundTrip ? '<div class="col-sm-5 right-align">Return Airline</div><div class="col-sm-7 left-align">' + airlineNameForCode(nextEntry["returnLine"]) + '</div><br>' : '') +
					'<div class="col-sm-5 right-align">Type</div><div class="col-sm-7 left-align">' + (isRoundTrip ? 'Round trip' : 'Single flight') + '</div><br>' +
				'</h3>' +
			'</div>').prependTo(".right-box");
		}
		$('.bookButton').click(function() {
			window.open(constructURL(nextEntry));
		});
	    checkButtons();
	});
}

function constructURL(offerInfo) {
	//https://www.expedia.com/Flights-Search?trip=roundtrip&leg1=from:ATL,to:SFO,departure:09/30/2016TANYT&leg2=from:SFO,to:ATL,departure:10/01/2016TANYT&passengers=children:0,adults:1,seniors:0,infantinlap:Y&mode=search
	return 'https://www.expedia.com/Flights-Search?trip=' + (isRoundTrip ? 'roundtrip' : 'oneway') + '&leg1=from:' + offerInfo['origin'] + ',to:' + offerInfo['destination'] + ',departure:' + formatDateShort(offerInfo['departureTime']) + 'TANYT&leg2=from:' + offerInfo['destination'] + ',to:' + offerInfo['origin'] + ',departure:' + formatDateShort(offerInfo['returnTime']) + 'TANYT&passengers=children:0,adults:1,seniors:0,infantinlap:Y&mode=search';
}

function checkButtons() {
    if (currentListIndex == 0) {
		$('.prevButton').attr('disabled', true);
	} else {
		$('.prevButton').attr('disabled', false);
	}
	if (currentListIndex == offers.length - 1) {
		$('.nextButton').attr('disabled', true);
	} else {
		$('.nextButton').attr('disabled', false);
	}
}

function formatDateLong(date) {
	if (date) {
		var d = new Date(date);
		var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
		var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
		return days[d.getDay()] + ", " + months[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear() + ", " + d.getHours() + ":" + d.getMinutes() + (d.getHours() < 12 ? "AM" : "PM");
	} else {
		return undefined;
	}
}

function formatDateShort(date) {
	var d = new Date(date);
	return (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear();
}

function airlineNameForCode(code) {
	var airlines = {
		'6A' : 'AVIACSA',
		'9K' : 'Cape Air',
		'A0' : 'L\'Avion',
		'A7' : 'Air Plus Comet',
		'AA' : 'American',
		'AC' : 'Air Canada',
		'AF' : 'Air France',
		'AI' : 'Air India',
		'AM' : 'Aeromexico',
		'AR' : 'Aerolineas Argentinas',
		'AS' : 'Alaska',
		'AT' : 'Royal Air Maroc',
		'AV' : 'Avianca',
		'AY' : 'Finnair',
		'AZ' : 'Alitalia',
		'B6' : 'JetBlue',
		'BA' : 'British Airways',
		'BD' : 'bmi british midland',
		'BR' : 'EVA Airways',
		'C6' : 'CanJet Airlines',
		'CA' : 'Air China',
		'CI' : 'China',
		'CO' : 'Continental',
		'CX' : 'Cathay',
		'CZ' : 'China Southern',
		'DL' : 'Delta',
		'EI' : 'Aer Lingus',
		'EK' : 'Emirates',
		'EO' : 'EOS',
		'F9' : 'Frontier',
		'FI' : 'Icelandair',
		'FJ' : 'Air Pacific',
		'FL' : 'AirTran',
		'G4' : 'Allegiant',
		'GQ' : 'Big Sky',
		'HA' : 'Hawaiian',
		'HP' : 'America West',
		'HQ' : 'Harmony',
		'IB' : 'Iberia',
		'JK' : 'Spanair',
		'JL' : 'JAL',
		'JM' : 'Air Jamaica',
		'KE' : 'Korean',
		'KU' : 'Kuwait',
		'KX' : 'Cayman',
		'LA' : 'LanChile',
		'LH' : 'Lufthansa',
		'LO' : 'LOT',
		'LT' : 'LTU',
		'LW' : 'Pacific Wings',
		'LX' : 'SWISS',
		'LY' : 'El Al',
		'MA' : 'MALEV',
		'MH' : 'Malaysia',
		'MU' : 'China Eastern',
		'MX' : 'Mexicana',
		'NH' : 'ANA',
		'NK' : 'Spirit',
		'NW' : 'Northwest',
		'NZ' : 'Air New Zealand',
		'OS' : 'Austrian',
		'OZ' : 'Asiana',
		'PN' : 'Pan American',
		'PR' : 'Philippine',
		'QF' : 'Qantas',
		'QK' : 'Air Canada Jazz',
		'RG' : 'VARIG',
		'SA' : 'South African',
		'SK' : 'SAS',
		'SN' : 'SN Brussels',
		'SQ' : 'Singapore',
		'SU' : 'Aeroflot',
		'SY' : 'Sun Country',
		'TA' : 'Taca',
		'TG' : 'Thai',
		'TK' : 'Turkish',
		'TN' : 'Air Tahiti Nui',
		'TP' : 'TAP',
		'TS' : 'Air Transat',
		'U5' : 'USA 3000',
		'UA' : 'United',
		'UP' : 'Bahamasair',
		'US' : 'US Air',
		'V3' : 'Copa',
		'VS' : 'Virgin Atlantic',
		'VX' : 'Virgin America',
		'WA' : 'Western',
		'WN' : 'Southwest',
		'WS' : 'WestJet',
		'XE' : 'ExpressJet',
		'Y2' : 'Globespan',
		'Y7' : 'Silverjet',
		'YV' : 'Mesa',
		'YX' : 'Midwest',
		'ZK' : 'Great Lakes'
	};
	if (airlines[code]) {
		return airlines[code];
	} else {
		return 'Unknown';
	}
}