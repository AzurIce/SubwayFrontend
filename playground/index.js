import GtfsRealtimeBindings from "gtfs-realtime-bindings";
import fetch from "node-fetch";

(async () => {
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
    // console.log(response)
    const buffer = await response.arrayBuffer();
    // console.log(new Uint8Array(buffer))
    const feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(
      new Uint8Array(buffer)
    );
    console.log(feed)
    console.log(feed.entity[0].tripUpdate)
    console.log(feed.entity[0].tripUpdate.stopTimeUpdate[0])
    console.log(feed.entity[1].vehicle)
    // feed.entity.forEach((entity) => {
    //   if (entity.tripUpdate) {
    //     // console.log(entity.tripUpdate);
    //   }
    // });
  }
  catch (error) {
    console.log(error);
  }
})();