import pandas
from tqdm import tqdm
from geojson import Feature, FeatureCollection, Point

df = pandas.read_csv('google_transit/stops.csv')
df = df[['stop_name', 'stop_lat', 'stop_lon']]

features = []
for index, row in tqdm(df.iterrows()):
    stop_name, stop_lat, stop_lon = row
    features.append(
        Feature(
            geometry = Point((stop_lon, stop_lat)),
            properties = {
                'stop_name': stop_name
            }
        )
    )

collection = FeatureCollection(features)
with open("google_transit/stops.geojson", "w") as f:
    f.write(f'{collection}')
