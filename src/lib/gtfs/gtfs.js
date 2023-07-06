import GtfsRealtimeBindings from "gtfs-realtime-bindings"
import axios from 'axios'

export async function getData() {
  console.log('Getting GTFS Realtime data...')
  try {
    const res = await axios.get(
      'https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs',
      {
        headers: { "x-api-key": 'wfaW5qsRVD3CjWqaCecgz5w3PswW11Dxa3iv3PAl' },
        responseType: 'arraybuffer'
      }
    )
    const feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(
      new Uint8Array(res.data)
    );
    return feed
  } catch (err) {
    console.log(err)
  }
}