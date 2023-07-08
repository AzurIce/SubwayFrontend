import pandas
from tqdm import tqdm
from geojson import Feature, FeatureCollection, LineString

df = pandas.read_csv('data/google_transit/shapes.csv')
df = df[['shape_id', 'shape_pt_lat', 'shape_pt_lon']]

# ['1.', '2.', '3.', '4.', '5.', '6.', '7.', 'A.', 'B.', 'C.', 'D.', 'E.', 'F.', 'FS', 'G.', 'GS', 'H.', 'J.', 'L.', 'M.', 'N.', 'Q.', 'R.', 'SI']
# print(sorted(list(set([s[:2] for s in list(df['shape_id'])]))))

# color_df = pandas.read_csv('routes.csv', index_col='route_id')[['route_color']]
# print(color_df)

routes = {
    '1': '1',
    '2': '2',
    '3': '3',
    '4': '4',
    '5': '5',
    '5X': '5',
    '6': '6',
    '6X': '6',
    '7': '7',
    '7X': '7',
    'A': 'A',
    'B': 'B',
    'C': 'C',
    'D': 'D',
    'E': 'E',
    'F': 'F',
    'FX': 'F',
    'FS': 'F',
    'G': 'G',
    'GS': 'S',
    'J': 'J',
    'L': 'L',
    'M': 'M',
    'N': 'N',
    'H': 'S',
    'Q': 'Q',
    'R': 'R',
    'W': 'W',
    'Z': 'Z',
    'SI': 'SIR',
}

# ['1', '2', '3', '4', '5', '6', '7', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'J', 'L', 'M', 'N', 'Q', 'R', 'S', 'SIR', 'W', 'Z']
# print(sorted(list(set(routes.values()))))

colors = {
    '1': '#EE352E',
    '2': '#EE352E',
    '3': '#EE352E',

    '4': '#00933C',
    '5': '#00933C',
    '6': '#00933C',

    '7': '#B933AD',

    'A': '#2850AD',
    'C': '#2850AD',
    'E': '#2850AD',

    'B': '#FF6319',
    'D': '#FF6319',
    'F': '#FF6319',
    'M': '#FF6319',

    'G': '#6CBE45',

    'H': '#6c6d70',

    'J': '#996633',
    'Z': '#996633',

    'L': '#A7A9AC',



    'N': '#FCCC0A',
    'Q': '#FCCC0A',
    'R': '#FCCC0A',
    'W': '#FCCC0A',

    'S': '#6D6E71',

    'SIR': '#006bb6'
}

lines_points = {}
for index, row in tqdm(df.iterrows()):
    shape_id, shape_pt_lat, shape_pt_lon = row
    # line = shape_id.split('..')[0]
    line = shape_id
    if line not in lines_points:
        lines_points[line] = []
    lines_points[line].append((shape_pt_lon, shape_pt_lat))

features = []
for line, points in tqdm(lines_points.items()):
    # print(line)
    # print(colors[line.split('.')[0]])
    features.append(
        Feature(
            geometry = LineString(points),
            properties = {
                'line': routes[line.split('.')[0]],
                'shape-id': line,
                'color': colors[routes[line.split('.')[0]]]
            }
        )
    )

collection = FeatureCollection(features)
with open("data/google_transit/shapes.geojson", "w") as f:
    f.write(f'{collection}')
