<!-- 热力图青春版 -->
<template>
    <div id="map"></div>
</template>

<script setup>
    import mapboxgl from 'mapbox-gl' // or "const mapboxgl = require('mapbox-gl');"
    import 'mapbox-gl/dist/mapbox-gl.css'
    import { onMounted } from 'vue'

    onMounted(()=>{
        mapboxgl.accessToken = 'pk.eyJ1Ijoid25razYzNTAiLCJhIjoiY2xqd2ZncTJiMHNhczNtcWY4czR0OXZsayJ9.3OcVrgLgTlmhATgA3ZwWqA';
        const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/dark-v11',
        center: [-73.9, 40.75],     //经纬度中心
        zoom: 9.7             //缩放级别
        });
 
    map.on('load', () => {
    // Add a geojson point source.
    map.addSource('stationMes', {
        'type': 'geojson',
        'data':'tes.geojson'  //到时候交互读取数据
    });
   
    map.addLayer(
    {
        'id':'StationEntry-heat',
        'type': 'heatmap',
        'source': 'stationMes',    //读取资源
        'maxzoom': 11,               //设置最大缩放级别,超过这个点位后用圆圈来标识
        'paint': {
    // Increase the heatmap weight based on frequency and property magnitude
            'heatmap-weight': [     
                'interpolate',
                ['linear'],
                ['get','Entries'],
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
                20
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
         },
         'waterway-label'
     );
    
    map.addLayer(
    {
        'id':'StationEntry-point',
        'type': 'circle',
        'source': 'stationMes',
        'minzoom': 11,
        'paint': {

        'circle-radius': [ //动态调整了半径大小
            'interpolate',
            ['linear'],
            ['zoom'],
            11,
            ['interpolate', ['linear'],  ['to-number', ['get','Entries']], 1, 3, 2000, 10],
            18,
            ['interpolate', ['linear'],  ['to-number', ['get','Entries']], 1, 20, 2000, 50]
        ],

        'circle-color': [
            'interpolate',
            ['linear'],
            ['to-number', ['get','Entries']],
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
        },
    'waterway-label'
    );

    map.addLayer(
        {
            'id':'text-labels',
            'type':'symbol',
            'source':'stationMes',
            'minZoom':11,
            'layout':{
                'text-field':['get','id'],
                'text-variable-anchor':['top'],
                'text-radial-offset':1,
                'text-justify':'auto',
                'text-size':12
            },
            'paint':{
                'text-color':'rgb(165,207,213)',
                'text-opacity':[
                    'interpolate',
                    ['linear'],
                    ['zoom'],
                    10,
                    0,
                    10.5,
                    1
                ]
            }
        },
        'waterway-label'
    )
    })
    });

</script>

<style scoped>
    body { margin: 0; padding: 0; }
    #map { position: absolute; top: 0; bottom: 0; width: 100%; }
</style>