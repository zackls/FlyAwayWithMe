import datetime
import requests
import json

key = 'OzVFoq2hbfr0ZDroP9yuPeZsEHapjptr'
url = 'http://terminal2.expedia.com:80/x/flights/overview/get'

header = {'Authorization': 'expedia-apikey key=OzVFoq2hbfr0ZDroP9yuPeZsEHapjptr',
        'Content-Type': 'application/json', 'Accept': 'application/json'}

end = datetime.date(2016,11,1)
date_list = [end - datetime.timedelta(days=x) for x in range(0, 30)]

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
        {'AirportCode': ['ATL']},
        'DestinationAirportCodeList': 
        {'AirportCode': ['LAX']},
        'FareCalendar': {
            "StartDate" : "2016-10-1",
            "DayCount" : 30 }
}
r = requests.post(url, data=json.dumps(payload), headers=header)
data = json.loads(r.text)

offers = data['FareCalendar']['AirOfferSummary']

minPrice = 100000
flightInfo = {}

for offer in offers:
    price = float(offer['FlightPriceSummary']['TotalPrice']) 
    if price < minPrice:
        flightInfo = offer['FlightItinerarySummary']
        minPrice = price

home = flightInfo['OutboundDepartureAirportCode']
visit = flightInfo['InboundDepartureAirportCode']
outDate = flightInfo['OutboundDepartureTime']
inDate = flightInfo['InboundDepartureTime']

outDate = outDate.split('T')[0]
outDate = outDate.split("-")[1] + "/" + outDate.split("-")[2] + "/" +  outDate.split("-")[0]

inDate = inDate.split('T')[0]
inDate = inDate.split("-")[1] + "/" + inDate.split("-")[2] + "/" +  inDate.split("-")[0]

link = 'https://www.expedia.com/Flights-Search?trip=roundtrip&leg1=from:'
link += home + ',to:' + visit + ',departure:' + outDate + 'TANYT&leg2=from:' 
link += visit + ',to:' + home + ',departure:' + inDate + 'TANYT&passengers=children:0,adults:'
link += "1" + ',seniors:0,infantinlap:Y&mode=search'

print minPrice
print flightInfo
print link
