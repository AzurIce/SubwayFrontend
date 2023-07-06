import GtfsRealtimeBindings from "gtfs-realtime-bindings"
import axios from 'axios'

export async function getData() {
  console.log('Getting GTFS Realtime data...')
  axios.get(
    'https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-ace',
    {
      headers: { "x-api-key": 'wfaW5qsRVD3CjWqaCecgz5w3PswW11Dxa3iv3PAl' },
      responseType: 'arraybuffer'
    }
  ).then((res) => {
    console.log('Parsing GTFS Realtime data...')
    const feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(
      new Uint8Array(res.data)
    );
    // feed.entity.forEach((entity) => {
    //   if (entity.tripUpdate) {
    //     console.log(entity.tripUpdate)
    //   }
    // });
    return feed
  }).catch((error) => {
    console.log(error)
  })
}