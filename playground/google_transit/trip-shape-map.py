import pandas as pd

df = pd.read_csv('trips.csv')[['trip_id', 'shape_id']]

df['trip_id'] = df['trip_id'].str.extract(r'.*?-\d\d_(.*)')


print(df)