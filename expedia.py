import datetime
import requests
import json

def getFlightInfo(depAirPort):
    url = 'http://terminal2.expedia.com:80/x/flights/overview/get'

    header = {'Authorization': 'expedia-apikey key=OzVFoq2hbfr0ZDroP9yuPeZsEHapjptr',
            'Content-Type': 'application/json', 'Accept': 'application/json'}

    end = datetime.date(2016,11,1)
    date_list = [end - datetime.timedelta(days=x) for x in range(0, 30)]

    minPrice = 100000
    flightInfo = {}

    for date in date_list:
        payload = {
            'MessageHeader': 
            {'ClientInfo':
                {'DirectClientName': 'Hackathon'},
                'TransactionGUID': ''},
                'tpid': 1,
                'eapid': 0,
                'PointOfSaleKey':
                {'JurisdictionCountryCode': 'USA',
                    'CompanyCode': '10111',
                    'ManagementUnitCode': '1010'},
                'OriginAirportCodeList': 
                {'AirportCode': [depAirPort]},
                'DestinationAirportCodeList': 
                {'AirportCode': ['SFO']},
                'FareCalendar': {
                    "StartDate" : date.isoformat(),
                    "DayCount" : 30 }
        }
        r = requests.post(url, data=json.dumps(payload), headers=header)
        data = json.loads(r.text)

        offers = data['FareCalendar']['AirOfferSummary']

        for offer in offers:
            price = float(offer['FlightPriceSummary']['TotalPrice']) 
            if price < minPrice:
                flightInfo = offer['FlightItinerarySummary']
                stuff = offer
                minPrice = price

    home = flightInfo['OutboundDepartureAirportCode']
    visit = flightInfo['InboundDepartureAirportCode']
    outDate = flightInfo['OutboundDepartureTime']
    inDate = flightInfo['InboundDepartureTime']
    outAirLine = flightInfo['OutboundDepartureAirlineCode']
    inAirLine = flightInfo['InboundDepartureAirlineCode']

    flightInfo = {'home':home,'visit':visit,'outDate':outDate,'inDate':inDate,
            'minPrice':minPrice,'outAirLine':outAirLine,'inAirLine':inAirLine}

    outDate = outDate.split('T')[0]
    outDate = outDate.split("-")[1] + "/" + outDate.split("-")[2] + "/" +  outDate.split("-")[0]
    inDate = inDate.split('T')[0]
    inDate = inDate.split("-")[1] + "/" + inDate.split("-")[2] + "/" +  inDate.split("-")[0]

    #Make link that doesn't show the flight....
    link = 'https://www.expedia.com/Flights-Search?trip=roundtrip&leg1=from:'
    link += home + ',to:' + visit + ',departure:' + outDate + 'TANYT&leg2=from:' 
    link += visit + ',to:' + home + ',departure:' + inDate + 'TANYT&passengers=children:0,adults:'
    link += '1,seniors:0,infantinlap:Y&mode=search'

    print minPrice
    print flightInfo
    print link
    return flightInfo
