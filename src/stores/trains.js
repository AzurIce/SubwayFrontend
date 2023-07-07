import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { getData } from '../lib/gtfs/gtfs'

export const useCounterStore = defineStore('trains', () => {
  const trains = ref([])
  const trips = ref([])

  async function updateTrains() {
    // let geojson = {}

    const feed = await getData('https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs')
        // console.log(feed)
        let geojson = {
          'type': 'FeatureCollection',
          'features': []
        };

        feed.entity.forEach(entity => {
          if (entity.vehicle) {
            // console.log(entity.vehicle)
            let stop = stops_data[entity.vehicle.stopId]
            // console.log(stop)
            geojson.features.push(
              {
                'type': 'Feature',
                'geometry': {
                  'type': 'Point',
                  'coordinates': [stop.lon, stop.lat]
                }
              }
            )
          }
        })
  }

  return { trains, updateTrains }
})
