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
        {'AirportCode': ['DFW']},
        'FareCalendar': {}
}
r = requests.post(url, data=json.dumps(payload,ensure_ascii=False), headers=header)
data = json.loads(r.text)

print r
print r.text
print data
"""
minPrice = 100000
legIds = ''

for date in date_list:

    payload = {'departureDate':date.isoformat(), 
            'departureAirport':'ATL', 'arrivalAirport':'DFW', 
            'numberOfAdultTravelers':'1', 'maxOfferCount':'2000'}

    r = requests.get(url, params=payload, headers=headers)
    data = json.loads(r.text)

    #prices = [float(price['totalPrice']['amount']) for price in data['offers']]
    #print prices

    for offer in data['offers']:
        price = float(offer['totalPrice']['amount']) 
        if price < minPrice:
            minPrice = price
            legIds = offer['legIds']

print legIds
print minPrice
            
payload = {'departureDate':datetime.date(2016,11,5).isoformat(), 
        'departureAirport':'DFW', 'arrivalAirport':'ATL', 
        'numberOfAdultTravelers':'1', 'maxOfferCount':'2000'}

r = requests.get(url, params=payload, headers=headers)
data = json.loads(r.text)

retMinPrice = 100000
retLegIds = ''

for offer in data['offers']:
    price = float(offer['totalPrice']['amount']) 
    if price < retMinPrice:
        retMinPrice = price
        retLegIds = offer['legIds']

print retLegIds
print retMinPrice
"""
