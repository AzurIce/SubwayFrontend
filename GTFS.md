tripUpdate 中包含某一条线路站点的到达以及出发预计时间。

其后跟随的 vehicle 所在线路与其对应。



GTFS Realtime API -> geojso of each train -> update map source



shapes.txt 正序为 N 逆序为 S









route  shape

线路 -> 形状 -> 点（坐标）



​        stop

GTFS -> 站点 & 时间戳



列车的坐标





trip.route_id <-> routes.csv route_id















示例数据：

```json
FeedMessage {
  entity: [
    FeedEntity { id: '000001A', tripUpdate: [TripUpdate] },
    FeedEntity { id: '000002A', vehicle: [VehiclePosition] },
    FeedEntity { id: '000003A', tripUpdate: [TripUpdate] },
    FeedEntity { id: '000004A', vehicle: [VehiclePosition] },
    FeedEntity { id: '000005A', tripUpdate: [TripUpdate] },
    FeedEntity { id: '000006A', vehicle: [VehiclePosition] },
    FeedEntity { id: '000007A', tripUpdate: [TripUpdate] },
    FeedEntity { id: '000008A', vehicle: [VehiclePosition] },
    FeedEntity { id: '000009A', tripUpdate: [TripUpdate] },
    FeedEntity { id: '000010A', vehicle: [VehiclePosition] },
    FeedEntity { id: '000011A', tripUpdate: [TripUpdate] },
    FeedEntity { id: '000012A', vehicle: [VehiclePosition] },
    FeedEntity { id: '000013A', tripUpdate: [TripUpdate] },
    FeedEntity { id: '000014A', vehicle: [VehiclePosition] },
    FeedEntity { id: '000015A', tripUpdate: [TripUpdate] },
    FeedEntity { id: '000016A', vehicle: [VehiclePosition] },
    FeedEntity { id: '000017A', tripUpdate: [TripUpdate] },
    FeedEntity { id: '000018A', vehicle: [VehiclePosition] },
    FeedEntity { id: '000019A', tripUpdate: [TripUpdate] },
    FeedEntity { id: '000020A', vehicle: [VehiclePosition] },
    FeedEntity { id: '000021A', tripUpdate: [TripUpdate] },
    FeedEntity { id: '000022A', vehicle: [VehiclePosition] },
    FeedEntity { id: '000023A', tripUpdate: [TripUpdate] },
    FeedEntity { id: '000024A', vehicle: [VehiclePosition] },
    FeedEntity { id: '000025A', tripUpdate: [TripUpdate] },
    FeedEntity { id: '000026A', vehicle: [VehiclePosition] },
    FeedEntity { id: '000027A', tripUpdate: [TripUpdate] },
    FeedEntity { id: '000028A', vehicle: [VehiclePosition] },
    FeedEntity { id: '000029A', tripUpdate: [TripUpdate] },
    FeedEntity { id: '000030A', vehicle: [VehiclePosition] },
    FeedEntity { id: '000031A', tripUpdate: [TripUpdate] },
    FeedEntity { id: '000032A', vehicle: [VehiclePosition] },
    FeedEntity { id: '000033A', tripUpdate: [TripUpdate] },
    FeedEntity { id: '000034A', vehicle: [VehiclePosition] },
    FeedEntity { id: '000035A', tripUpdate: [TripUpdate] },
    FeedEntity { id: '000036A', vehicle: [VehiclePosition] },
    FeedEntity { id: '000037A', tripUpdate: [TripUpdate] },
    FeedEntity { id: '000038A', vehicle: [VehiclePosition] },
    FeedEntity { id: '000039A', tripUpdate: [TripUpdate] },
    FeedEntity { id: '000040A', vehicle: [VehiclePosition] },
    FeedEntity { id: '000041A', tripUpdate: [TripUpdate] },
    FeedEntity { id: '000042A', vehicle: [VehiclePosition] },
    FeedEntity { id: '000043A', tripUpdate: [TripUpdate] },
    FeedEntity { id: '000044A', vehicle: [VehiclePosition] },
    FeedEntity { id: '000045A', tripUpdate: [TripUpdate] },
    FeedEntity { id: '000046A', vehicle: [VehiclePosition] },
    FeedEntity { id: '000047A', tripUpdate: [TripUpdate] },
    FeedEntity { id: '000048A', vehicle: [VehiclePosition] },
    FeedEntity { id: '000049A', tripUpdate: [TripUpdate] },
    FeedEntity { id: '000050A', vehicle: [VehiclePosition] },
    FeedEntity { id: '000051A', tripUpdate: [TripUpdate] },
    FeedEntity { id: '000052A', vehicle: [VehiclePosition] },
    FeedEntity { id: '000053A', tripUpdate: [TripUpdate] },
    FeedEntity { id: '000054A', vehicle: [VehiclePosition] },
    FeedEntity { id: '000055A', tripUpdate: [TripUpdate] },
    FeedEntity { id: '000056A', vehicle: [VehiclePosition] },
    FeedEntity { id: '000001E', tripUpdate: [TripUpdate] },
    FeedEntity { id: '000002E', vehicle: [VehiclePosition] },
    FeedEntity { id: '000003E', tripUpdate: [TripUpdate] },
    FeedEntity { id: '000004E', vehicle: [VehiclePosition] },
    FeedEntity { id: '000005E', tripUpdate: [TripUpdate] },
    FeedEntity { id: '000006E', vehicle: [VehiclePosition] },
    FeedEntity { id: '000007E', tripUpdate: [TripUpdate] },
    FeedEntity { id: '000008E', vehicle: [VehiclePosition] },
    FeedEntity { id: '000009E', tripUpdate: [TripUpdate] },
    FeedEntity { id: '000010E', vehicle: [VehiclePosition] },
    FeedEntity { id: '000011E', tripUpdate: [TripUpdate] },
    FeedEntity { id: '000012E', vehicle: [VehiclePosition] },
    FeedEntity { id: '000013E', tripUpdate: [TripUpdate] },
    FeedEntity { id: '000014E', vehicle: [VehiclePosition] },
    FeedEntity { id: '000015E', tripUpdate: [TripUpdate] },
    FeedEntity { id: '000016E', vehicle: [VehiclePosition] },
    FeedEntity { id: '000017E', tripUpdate: [TripUpdate] },
    FeedEntity { id: '000018E', vehicle: [VehiclePosition] },
    FeedEntity { id: '000019E', tripUpdate: [TripUpdate] },
    FeedEntity { id: '000020E', vehicle: [VehiclePosition] },
    FeedEntity { id: '000021E', tripUpdate: [TripUpdate] },
    FeedEntity { id: '000022E', vehicle: [VehiclePosition] },
    FeedEntity { id: '000023E', tripUpdate: [TripUpdate] },
    FeedEntity { id: '000024E', vehicle: [VehiclePosition] },
    FeedEntity { id: '000025E', tripUpdate: [TripUpdate] },
    FeedEntity { id: '000026E', vehicle: [VehiclePosition] },
    FeedEntity { id: '000027E', tripUpdate: [TripUpdate] },
    FeedEntity { id: '000028E', vehicle: [VehiclePosition] },
    FeedEntity { id: '000029E', tripUpdate: [TripUpdate] },
    FeedEntity { id: '000030E', vehicle: [VehiclePosition] },
    FeedEntity { id: '000001H', tripUpdate: [TripUpdate] },
    FeedEntity { id: '000002H', vehicle: [VehiclePosition] },
    FeedEntity { id: '000003H', tripUpdate: [TripUpdate] },
    FeedEntity { id: '000004H', vehicle: [VehiclePosition] },
    FeedEntity { id: '000005H', tripUpdate: [TripUpdate] },
    FeedEntity { id: '000006H', vehicle: [VehiclePosition] },
    FeedEntity { id: '000007H', tripUpdate: [TripUpdate] },
    FeedEntity { id: '000008H', vehicle: [VehiclePosition] },
    FeedEntity { id: '000009H', tripUpdate: [TripUpdate] },
    FeedEntity { id: '000010H', vehicle: [VehiclePosition] },
    FeedEntity { id: '000011H', tripUpdate: [TripUpdate] },
    FeedEntity { id: '000012H', vehicle: [VehiclePosition] },
    FeedEntity { id: '000013H', tripUpdate: [TripUpdate] },
    FeedEntity { id: '000014H', vehicle: [VehiclePosition] },
    ... 42 more items
  ],
  header: FeedHeader {
    gtfsRealtimeVersion: '1.0',
    timestamp: Long { low: 1688532315, high: 0, unsigned: true }
  }
}
```

tripupdate 示例数据：

```json
TripUpdate {
  stopTimeUpdate: [],
  trip: TripDescriptor {
    tripId: '137400_A..S',
    startTime: '22:54:00',
    startDate: '20230704',
    routeId: 'A'
  }
```

```json
TripUpdate {
  stopTimeUpdate: [
    StopTimeUpdate {
      arrival: [StopTimeEvent],
      departure: [StopTimeEvent],
      stopId: 'A09N'
    },
    StopTimeUpdate {
      arrival: [StopTimeEvent],
      departure: [StopTimeEvent],
      stopId: 'A07N'
    },
    StopTimeUpdate {
      arrival: [StopTimeEvent],
      departure: [StopTimeEvent],
      stopId: 'A06N'
    },
    StopTimeUpdate {
      arrival: [StopTimeEvent],
      departure: [StopTimeEvent],
      stopId: 'A05N'
    },
    StopTimeUpdate {
      arrival: [StopTimeEvent],
      departure: [StopTimeEvent],
      stopId: 'A03N'
    },
    StopTimeUpdate {
      arrival: [StopTimeEvent],
      departure: [StopTimeEvent],
      stopId: 'A02N'
    }
  ],
  trip: TripDescriptor {
    tripId: '138500_A..N',
    startTime: '23:05:00',
    startDate: '20230704',
    routeId: 'A'
  }
}
```

```json
TripUpdate {
  stopTimeUpdate: [
    StopTimeUpdate {
      arrival: [StopTimeEvent],
      departure: [StopTimeEvent],
      stopId: 'A06N'
    },
    StopTimeUpdate {
      arrival: [StopTimeEvent],
      departure: [StopTimeEvent],
      stopId: 'A05N'
    },
    StopTimeUpdate {
      arrival: [StopTimeEvent],
      departure: [StopTimeEvent],
      stopId: 'A03N'
    },
    StopTimeUpdate {
      arrival: [StopTimeEvent],
      departure: [StopTimeEvent],
      stopId: 'A02N'
    }
  ],
  trip: TripDescriptor {
    tripId: '138500_A..N',
    startTime: '23:05:00',
    startDate: '20230704',
    routeId: 'A'
  }
}
StopTimeUpdate {
  arrival: StopTimeEvent {
    time: Long { low: 1688533532, high: 0, unsigned: false }
  },
  departure: StopTimeEvent {
    time: Long { low: 1688533532, high: 0, unsigned: false }
  },
  stopId: 'A02N'
}
```



vehicle 示例数据：

```json
VehiclePosition {
  multiCarriageDetails: [],
  trip: TripDescriptor {
    tripId: '137400_A..S',
    startTime: '22:54:00',
    startDate: '20230704',
    routeId: 'A'
  },
  currentStopSequence: 57,
  currentStatus: 1,
  timestamp: Long { low: 1688532043, high: 0, unsigned: true },
  stopId: 'H11S'
}
```

```json

VehiclePosition {
  multiCarriageDetails: [],
  trip: TripDescriptor {
    tripId: '138500_A..N',
    startTime: '23:05:00',
    startDate: '20230704',
    routeId: 'A'
  },
  currentStopSequence: 53,
  currentStatus: 1,
  timestamp: Long { low: 1688532852, high: 0, unsigned: true },
  stopId: 'A09N'
}
```

```json

VehiclePosition {
  multiCarriageDetails: [],
  trip: TripDescriptor {
    tripId: '138500_A..N',
    startTime: '23:05:00',
    startDate: '20230704',
    routeId: 'A'
  },
  currentStopSequence: 55,
  currentStatus: 1,
  timestamp: Long { low: 1688533057, high: 0, unsigned: true },
  stopId: 'A06N'
}
```



## 数据类型

### TripUpdates

描述如 "列车 X 延误了 5 分钟" 的信息

Trip updates represent fluctuations in the timetable.

We would expect to receive trip updates for all trips you have scheduled that are realtime-capable.

These updates would give a predicted arrival or departure for stops along the route.

Trip updates can also provide for more complex scenarios where trips are canceled, added to the schedule, or even re-routed.