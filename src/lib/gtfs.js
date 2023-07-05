import GtfsRealtimeBindings from "gtfs-realtime-bindings";
import fetch from "node-fetch";

export async function getData() {
  try {
    const response = await fetch("https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-ace", {
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
    console.log(response)
    const buffer = await response.arrayBuffer();
    const feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(
      new Uint8Array(buffer)
    );
    return feed
  }
  catch (error) {
    console.log(error);
  }
}