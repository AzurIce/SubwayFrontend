import json

from geojson import Feature, FeatureCollection, LineString, Point

stations = []

with open('./output/station_details.json', 'r') as f:
    json_str = f.read()
    json_data = json.loads(json_str)

    for key, value in json_data.items():
        stations.append(
            {
                'id': key,
                'name': value['name'],
                'coord': [value['longitude'], value['latitude']]
            }
        )

with open("./output/stations.json", "w") as f:
    f.write(json.dumps(stations))
