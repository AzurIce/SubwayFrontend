import requests
from pprint import pprint

res = requests.get('https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-ace', headers={
    'x-api-key': 'wfaW5qsRVD3CjWqaCecgz5w3PswW11Dxa3iv3PAl'
})

import gtfs_realtime_pb2

data = gtfs_realtime_pb2.FeedMessage()

data.ParseFromString(res.content)

with open('data.txt', 'w') as f:
    f.write(f'{data.entity}')
pprint(data.entity[:10])

for i in data.entity:
    print(data.entity.vehicle)
    # print(i)