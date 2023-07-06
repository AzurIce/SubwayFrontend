import requests
from pprint import pprint

urls = [
    "https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-ace",
    'https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-bdfm',
    'https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-g',
    'https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-jz',
    'https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-nqrw',
    'https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-l',
    'https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs',
    'https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-si'
]

res = requests.get('https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs', headers={
    'x-api-key': 'wfaW5qsRVD3CjWqaCecgz5w3PswW11Dxa3iv3PAl'
})

import gtfs_realtime_pb2, nyct_subway_pb2

data = gtfs_realtime_pb2.FeedMessage()

data.ParseFromString(res.content)

with open('data.txt', 'w') as f:
    f.write(f'{data.entity}')
pprint(data.entity[:10])

trips = []
vehicles = []

for entity in data.entity:
    if entity.HasField('trip_update'):
        vehicles.append(entity.trip_update)
    elif entity.HasField('vehicle'):
        vehicles.append(entity.vehicle)

trip_ids = [vehicle.trip.trip_id for vehicle in vehicles]
# print(trip_ids)
print(sorted(list(set(trip_ids))))

# for i in data.entity:
#     print(data.entity.vehicle)
    # print(i)