export const positionId = "position"

export function setPositionVisible(map, visible) {
  if (!map.getLayer(positionId)) return
  map.setLayoutProperty(positionId, 'visibility', visible ? 'visible' : 'none')
}

export async function updatePosition(map, geojson) {
  const trainPositionsGeoJson = geojson
  if (map.getSource(positionId)) {
    map.getSource(positionId).setData(trainPositionsGeoJson);
  } else {
    map.addSource(positionId, {
      "type": "geojson",
      "data": trainPositionsGeoJson
    });
  }

  if (!map.getLayer(positionId)) {
    map.addLayer({
      "id": positionId,
      "type": "symbol",
      "source": positionId,
      "layout": {
        "icon-image": ['get', 'icon'],
        "icon-allow-overlap": true,
        "icon-ignore-placement": true,
        "icon-size": {
          "stops": [[10, 0.5], [11, 1], [12, 1.5], [13, 2]]
        },
        "icon-rotate": ['get', 'bearing'],
        "icon-rotation-alignment": "map",
        "text-field": ['get', 'route'],
        "text-font": ['Lato Bold', "Open Sans Bold", "Arial Unicode MS Bold"],
        "text-size": {
          "stops": [[10, 6], [11, 8], [12, 10], [13, 12]]
        },
        "text-ignore-placement": true,
        "text-allow-overlap": true,
        // "text-offset": ['get', 'offset'],
        "text-rotate": ['get', 'text-rotate']
      },
      "paint": {
        "text-color": ['get', 'text-color'],
        "icon-color": ['get', 'icon-color'],
        "text-color-transition": {
          "duration": 500,
        },
        "text-halo-color": "#666666",
        "text-halo-width": ['get', 'halo-width'],
      },
    });
  }
  map.moveLayer('position', null)
}