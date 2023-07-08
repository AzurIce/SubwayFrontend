import json

stations = {}

with open('./output/station_details.json', r) as f:
    json_str = f.read()
    json_data = json.loads(json_str)

    for key in json_data.keys():
        