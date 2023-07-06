import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { getData } from '../lib/gtfs/gtfs'

export const useCounterStore = defineStore('trains', () => {
  const trains = ref([])
  const trips = ref([])

  async function updateTrains() {
    let geojson = {}

    let data = {}
    let res = getData()
    res.forEach(entity => {
      if (entity.vehicle) {
        if (!data[entity.vehicle.trip.trip_id]) {
          data[entity.vehicle.trip.trip_id] = {}
        }
        
      } else if (entity.tripUpdate) {
        if (!data[entity.tripUpdate.trip.trip_id]) {
          data[entity.tripUpdate.trip.trip_id] = {}
        }

      }
    })
  }

  return { trains, updateTrains }
})
