export const routeId = "route"

export function setRouteVisible(map, visible) {
  if (!map.getLayer(routeId)) return
  map.setLayoutProperty(routeId, 'visibility', visible ? 'visible' : 'none')
}

export async function updateRoute(map, geojson) {
  if (map.getSource(routeId)) {
    map.getSource(routeId).setData(geojson);
  } else {
    map.addSource(routeId, {
      "type": "geojson",
      "data": geojson
    });
  }

  if (!map.getLayer(routeId)) {
    const layer = {
      "id": routeId,
      "type": "line",
      "source": routeId,
      "layout": {
        "line-join": "miter",
        "line-cap": "round",
      },
      "paint": {
        "line-width": [
          "interpolate",
          ["linear"],
          ["zoom"],
          8, 1,
          13, 2,
          14, 5,
        ],
        "line-color": ["get", "color"],
        "line-offset": [
          "interpolate",
          ["linear"],
          ["zoom"],
          8, ["get", "offset"],
          13, ["*", ["get", "offset"], 1.5],
          14, ["*", ["get", "offset"], 3],
        ],
        "line-opacity": ["get", "opacity"],
      }
    };

    map.addLayer(layer);
  }
}