import GtfsRealtimeBindings from "gtfs-realtime-bindings"
import fetch from "node-fetch"
import stops_data from './google_transit/stops.json' assert {type: 'json'}

const urls = [
  "https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-ace",
  'https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-bdfm',
  'https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-g',
  'https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-jz',
  'https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-nqrw',
  'https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-l',
  'https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs',
  'https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-si'
]

async function getData(url) {
  // console.log(url)
  const response = await fetch(url, {
    headers: {
      "x-api-key": "wfaW5qsRVD3CjWqaCecgz5w3PswW11Dxa3iv3PAl",
      // replace with your GTFS-realtime source's auth token
      // e.g. x-api-key is the header value used for NY's MTA GTFS APIs
    },
  });
  if (!response.ok) {
    const error = new Error(`${response.url}: ${response.status} ${response.statusText}`);
    error.response = response;
    throw error;
  }
  // console.log(response)
  const buffer = await response.arrayBuffer();
  // console.log(new Uint8Array(buffer))
  const feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(
    new Uint8Array(buffer)
  );
  return feed
}

(async () => {
  try {
    const feed = await getData('https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs')
    //    for (let i = 0; i < urls.length; i++) {
    //      const feed = await getData(urls[i])
    //
    //      let route_id = []
    //      let res = feed.entity
    //      res.forEach(entity => {
    //        if (entity.vehicle) {
    //          route_id.push(entity.vehicle.trip.routeId)
    //        }
    //      })
    //      console.log([...new Set(route_id)])
    //    }
    //  console.log(feed.entity[0].tripUpdate)
    //  for (let i in feed.entity[0].tripUpdate.stopTimeUpdate) {
    //     console.log(feed.entity[0].tripUpdate.stopTimeUpdate[i])
    //  }
    //     console.log(feed.entity[0].tripUpdate.stopTimeUpdate[0])
    //  console.log(feed.entity[1].vehicle)


    // let route_id = []
    // let res = feed.entity
    // res.forEach(entity => {
    //   if (entity.vehicle) {
    //     route_id.push(entity.vehicle.trip.routeId)
    //   }
    // })
    // console.log([...new Set(route_id)])


    let geojson = {
      'type': 'FeatureCollection',
      'features': []
    };

    let data = {}
    let res = feed.entity
    res.forEach(entity => {
      if (entity.tripUpdate) {
        //        console.log(entity.tripUpdate)
        //        let tripId = entity.tripUpdate.trip.tripId
        //        if (entity.tripUpdate.stopTimeUpdate.length != 0) {
        //          // console.log(tripId)
        //          if (!data[tripId]) {
        //            data[tripId] = {}
        //          }
        //
        //          data[tripId].trips = entity.tripUpdate.stopTimeUpdate.map((stopTime) => {
        //            return {
        //              timestamp: stopTime.arrival.timestamp,
        //              stopId: stopTime.stopId,
        //            }
        //          })
        //        }
      } else if (entity.vehicle) {
        console.log(entity.vehicle)
        let tripId = entity.vehicle.trip.tripId
        if (!data[tripId]) {
          data[tripId] = {}
        }
        //          if (entity.vehicle.timestamp <= new Date().getTime() && data[tripId]) {
        //
        //            data[tripId].vehicle = {
        //              timestamp: entity.vehicle.timestamp,
        //              stopId: entity.vehicle.stopId,
        //            }
        let stop = stops_data[entity.vehicle.stopId]
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



    console.log(geojson)
    // let preLoc, nextLoc, curLoc
    // for (let tripId in data) {
    //   let preTimestamp, preStopId = data[tripId].vehicle
    //   let preName, preLat, preLon = trip_data[preStopId]
    //   for (let i = 0; i <= data[tripId].trips.length; i++) {
    //     let timestamp, stopId = data[tripId].trips[i]
    //     let name, lat, lon = trip_data[stopId]
    //     if (timestamp > preTimestamp) {
    //       preLoc = {
    //         timestamp: preTimestamp,
    //         lat: preLat,
    //         lon: preLon
    //       }
    //       nextLoc = {
    //         timestamp: timestamp,
    //         lat: lat,
    //         lon: lon
    //       }
    //       break;
    //     }
    //   }
    //   console.log(preLoc, nextLoc)
    //   let now = new Date().getTime()
    //   let progress = (now - preLoc.timestamp) / (nextLoc.timestamp - preLoc.timestamp)
    //   curLoc = {
    //     timestamp: now
    //     lng: progress * 
    //   }
    //   console.log(tripId)
    // }





  }
  catch (error) {
    console.log(error);
  }
})();