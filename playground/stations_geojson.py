import json

from geojson import Feature, FeatureCollection, LineString, Point

stations = {}

features = []
with open('./output/station_details.json', 'r') as f:
    json_str = f.read()
    json_data = json.loads(json_str)

    for key, value in json_data.items():
        features.append(
            Feature(
                geometry = Point([value['longitude'], value['latitude']]),
                properties = {
                    'id': key,
                    'name': value['name'],
                }
        )
    )

collection = FeatureCollection(features)

with open("./output/stations.geojson", "w") as f:
    f.write(json.dumps(collection))
