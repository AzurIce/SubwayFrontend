import pandas as pd
from tqdm import tqdm
import json

df_stations = pd.read_csv('./data/Stations.csv', index_col='GTFS Stop ID')
stations = {}

for gtfs_stop_id, row in tqdm(list(df_stations.iterrows())):
    stations[gtfs_stop_id] = {
        'name': row['Stop Name'],
        'longitude': float(row['GTFS Longitude']),
        'latitude': float(row['GTFS Latitude']),
        'borough': row['Borough'],
        'north': {},
        'south': {}
    }

df_shapes = pd.read_csv('./data/google_transit/shapes.csv').groupby('shape_id')

for shape_id, df in df_shapes:
    last_stations = []
    path = []
    for _, row in tqdm(list(df.iterrows())):
        lat, lon = row['shape_pt_lat'], row['shape_pt_lon']
        potential_stations = [k for k, v in stations.items() if v['latitude'] == lat and v['longitude'] == lon]
        if len(potential_stations) > 0:
            if len(last_stations) > 0:
                for ls in last_stations:
                    for ps in potential_stations:
                        stations[ls]['north'][ps] = path
                        stations[ps]['south'][ls] = list(reversed(path))
            last_stations = potential_stations
            path = []
        else:
            path.append([float(row[2]), float(row[1])])

with open("./output/station_details.json", "w") as file:
    json.dump(stations, file)