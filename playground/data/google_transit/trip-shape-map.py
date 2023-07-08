import pandas as pd
from pprint import pprint

def split_list_by_first_char(lst):
    result = {}
    for item in lst:
        first_char = item[0]
        if first_char not in result:
            result[first_char] = []
        result[first_char].append(item)
    return result

df = pd.read_csv('trips.csv')[['trip_id', 'shape_id']]

df['trip_id'] = df['trip_id'].str.extract(r'.*?-\d\d_(.*)')


print(df)

# pprint(split_list_by_first_char(sorted(map(str, list(set(df['shape_id']))))))