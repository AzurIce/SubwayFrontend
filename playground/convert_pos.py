import pandas as pd
from tqdm import tqdm

df_station = pd.read_csv('./data/Stations.csv')
df_id = pd.read_csv('./IdToPlace.csv')


arr = []

for _, row in tqdm(list(df_id.iterrows())):
    # print(row)
    potential_station = None
    for _, r in list(df_station.iterrows()):
        if (abs(r['GTFS Latitude'] - row['Latitude']) <= 0.00000001 and abs(r['GTFS Longitude'] - row['Longitude']) <= 0.00000001):
            potential_station = {
                'id': int(row['Unique ID']),
                'gtfs_id': r['GTFS Stop ID']
            }
    if potential_station is not None:
        arr.append(potential_station)

df = pd.DataFrame(arr)
df.to_csv('./output/id_map.csv')