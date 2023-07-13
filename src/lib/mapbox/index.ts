
interface MapboxSourceLayer {
  id: string;
  source(): any;
  layer(): any;
}

export const stationEntryLayer = () => {
  return {
    id: 'StationEntry-heat',
    type: 'heatmap',
    source: 'stationMes', //读取资源
    maxzoom: 11, //设置最大缩放级别,超过这个点位后用圆圈来标识
    paint: {
      // Increase the heatmap weight based on frequency and property magnitude
      'heatmap-weight': ['interpolate', ['linear'], ['get', 'Entries'], 0, 0, 2000, 1],
      // Increase the heatmap color weight weight by zoom level
      'heatmap-intensity': [
        //给强度设置热力图
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
      'heatmap-radius': ['interpolate', ['linear'], ['zoom'], 0, 2, 13, 20],
      // Transition from heatmap to circle layer by zoom level
      'heatmap-opacity': [
        //到9的时候热力图透明度为0
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
}

export const heatMapLayer = () => {}
