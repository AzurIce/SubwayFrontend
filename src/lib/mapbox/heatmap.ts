import { getHeatMapGeoJson } from '@/lib/axios/data'

export const heatmapEntriesHeatId = "heatmap-heat"
export const heatmapEntriesPointId = "heatmap-point"
export const heatmapEntriesLabelId = "heatmap-label"

export function setHeatmapVisible(map: any, visible: boolean) {
  if (!map.getLayer(heatmapEntriesHeatId)) return
  map.setLayoutProperty(heatmapEntriesHeatId, 'visibility', visible ? 'visible' : 'none')
  if (!map.getLayer(heatmapEntriesPointId)) return
  map.setLayoutProperty(heatmapEntriesPointId, 'visibility', visible ? 'visible' : 'none')
  if (!map.getLayer(heatmapEntriesLabelId)) return
  map.setLayoutProperty(heatmapEntriesLabelId, 'visibility', visible ? 'visible' : 'none')
}

export async function updateHeatMap(map: any) {
  const res = await getHeatMapGeoJson()
  // console.log(map)
  if (map.getSource("heatmap")) {
    map.getSource("heatmap").setData(res);
  } else {
    map.addSource("heatmap", {
      "type": "geojson",
      "data": res
    });
  }

  if (!map.getLayer(heatmapEntriesHeatId)) {
    map.addLayer({
      'id': heatmapEntriesHeatId,
      'type': 'heatmap',
      'source': 'heatmap',    //读取资源
      'maxzoom': 11,               //设置最大缩放级别,超过这个点位后用圆圈来标识
      'paint': {
        // Increase the heatmap weight based on frequency and property magnitude
        'heatmap-weight': [
          'interpolate',
          ['linear'],
          ['get', 'Entries'],
          0,
          0,
          2000,
          1
        ],
        // Increase the heatmap color weight weight by zoom level
        'heatmap-intensity': [ //给强度设置热力图
          'interpolate',
          ['linear'],
          ['zoom'],
          0,
          1,
          13,
          3
        ],
        // to create a blur-like effect.
        'heatmap-color': [
          'interpolate',
          ['linear'],
          ['heatmap-density'], //热力图密度函数
          0,
          'rgba(33,102,172,0)',
          0.2,
          'rgb(103,169,207)',
          0.4,
          'rgb(209,229,240)',
          0.6,
          'rgb(253,219,199)',
          0.8,
          'rgb(239,138,98)',
          1,
          'rgb(178,24,43)'
        ],
        // Adjust the heatmap radius by zoom level
        'heatmap-radius': [
          'interpolate',
          ['linear'],
          ['zoom'],
          0,
          2,
          13,
          30
        ],
        // Transition from heatmap to circle layer by zoom level
        'heatmap-opacity': [ //到9的时候热力图透明度为0
          'interpolate',
          ['linear'],
          ['zoom'],
          10,
          1,
          13,
          0
        ]
      }
    }
    )
  }

  if (!map.getLayer(heatmapEntriesPointId)) {
    map.addLayer({
      'id': heatmapEntriesPointId,
      'type': 'circle',
      'source': 'heatmap',
      'minzoom': 11,
      'paint': {

        'circle-radius': [ //动态调整了半径大小
          'interpolate',
          ['linear'],
          ['zoom'],
          11,
          ['interpolate', ['linear'], ['to-number', ['get', 'Entries']], 1, 3, 2000, 10],
          18,
          ['interpolate', ['linear'], ['to-number', ['get', 'Entries']], 1, 20, 2000, 50]
        ],

        'circle-color': [
          'interpolate',
          ['linear'],
          ['to-number', ['get', 'Entries']],
          40,
          'rgba(33,102,172,0.2)',
          300,
          'rgb(103,169,207)',
          600,
          'rgb(209,229,240)',
          1000,
          'rgb(253,219,199)',
          1500,
          'rgb(239,138,98)',
          2000,
          'rgb(178,24,43)'
        ],

        'circle-stroke-color': 'white', //描边颜色
        'circle-stroke-width': 1,       //描边宽度
        // Transition from heatmap to circle layer by zoom level 设置透明度
        'circle-opacity': [
          'interpolate',
          ['linear'],
          ['zoom'],
          11,
          0,
          11.5,
          1
        ]
      }
    }
    );
  }

  if (!map.getLayer(heatmapEntriesLabelId)) {
    map.addLayer({
      'id': heatmapEntriesLabelId,
      'type': 'symbol',
      'source': 'heatmap',
      'minZoom': 11,
      'layout': {
        'text-field': ['get', 'Entries'],
        'text-variable-anchor': ['top'],
        'text-radial-offset': 1,
        'text-justify': 'auto',
        'text-size': 12
      },
      'paint': {
        'text-color': 'rgb(165,207,213)',
        'text-opacity': [
          'interpolate',
          ['linear'],
          ['zoom'],
          10,
          0,
          10.5,
          1
        ]
      }
    })
  }
}