import json
import pandas as pd
import geopandas 
from geojson import Feature, FeatureCollection, LineString, Point

stations = {}

features = []
with open('./output/test.json', 'r') as f: #修改内容
    json_str = f.read()
    json_data = json.loads(json_str)

    for item in json_data:
        geometry=Point((float(item['Longitude']),float(item['Latitude']),0))
        properties={
                'id': item['id'],
                'Entries': item['Entries'],
                'Exits':item['Exits']
        }
        feature=Feature(geometry=geometry,properties=properties)
        features.append(feature)

feature_collection=FeatureCollection(features)
collection = FeatureCollection(features)
print("运行成功")

with open("./public/tes.geojson", "w") as f:  #修改文件内容
    f.write(f'{collection}')
