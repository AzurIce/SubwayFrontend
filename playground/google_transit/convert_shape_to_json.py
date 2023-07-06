import pandas
from tqdm import tqdm
from geojson import Feature, FeatureCollection, Point
import json

if __name__ == '__main__':
    df = pandas.read_csv('shapes.csv')
    df = df[['shape_id', 'shape_pt_lat', 'shape_pt_lon']]

    data = {}
    for index, row in tqdm(df.iterrows()):
        shape_id, shape_pt_lat, shape_pt_lon = row
        if shape_id not in data:
            data[shape_id] = []
        data[shape_id].append({
            'lat': shape_pt_lat,
            'lon': shape_pt_lon,
        })

    with open("shapes.json", "w") as f:
        f.write(json.dumps(data))