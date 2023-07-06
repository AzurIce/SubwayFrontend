import pandas
from tqdm import tqdm
from geojson import Feature, FeatureCollection, Point
import json

df = pandas.read_csv('google_transit/stops.csv')
df = df[['stop_id', 'stop_name', 'stop_lat', 'stop_lon']]

data = {}
for index, row in tqdm(df.iterrows()):
    stop_id, stop_name, stop_lat, stop_lon = row
    data[stop_id] = {
        'name': stop_name,
        'lat': stop_lat,
        'lon': stop_lon,
    }

with open("google_transit/stops.json", "w") as f:
    f.write(json.dumps(data))
