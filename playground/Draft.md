GTFS Static：[Reference  | Static Transit  | Google for Developers](https://developers.google.com/transit/gtfs/reference#tripstxt)

GTFS Realtime：[GTFS Realtime Overview  | Realtime Transit  | Google for Developers](https://developers.google.com/transit/gtfs-realtime)

## GTFS Static 文件

### 一些结构

### routes.txt

| Field Name         | Type  | Required                   | Description                                                  |
| :----------------- | :---- | :------------------------- | :----------------------------------------------------------- |
| `route_id`         | ID    | **Required**               | route 的唯一标识                                             |
| `route_short_name` | Text  | **Conditionally required** | Short name of a route                                        |
| `route_long_name`  | Text  | **Conditionally required** | Full name of a route                                         |
| `route_desc`       | Text  | Optional                   | Description of a route                                       |
| `route_type`       | Enum  | **Required**               | `1` - **Subway, Metro**. Any underground rail system within a metropolitan area. <br />`2` - **Rail**. Used for intercity or long-distance travel. `3` - Bus. Used for short- and long-distance bus routes. |
| `route_url`        | URL   | Optional                   | URL of a web page about the particular route. Should be different from the `agency.agency_url` value. |
| `route_color`      | Color | Optional                   | Route color designation that matches public facing material. Defaults to white (`FFFFFF`) when omitted or left empty. The color difference between `route_color` and `route_text_color` should provide sufficient contrast when viewed on a black and white screen. |
| `route_text_color` | Color | Optional                   | Legible color to use for text drawn against a background of `route_color`. Defaults to black (`000000`) when omitted or left empty. The color difference between `route_color` and `route_text_color` should provide sufficient contrast when viewed on a black and white screen. |

### trips.txt

| Field Name      | Type                                                         | Required                   | Description           |
| :-------------- | :----------------------------------------------------------- | :------------------------- | :-------------------- |
| `route_id`      | ID referencing `routes.route_id`                             | **Required**               | route 的唯一标识      |
| `service_id`    | ID referencing `calendar.service_id` or `calendar_dates.service_id` | **Required**               | service 的唯一标识    |
| `trip_id`       | ID                                                           | **Required**               | trip 的唯一标识       |
| `trip_headsign` | Text                                                         | Optional                   | 与前进方向有关        |
| `direction_id`  | Enum                                                         | Optional                   | 与前进方向有关        |
| `shape_id`      | ID referencing `shapes.shape_id`                             | **Conditionally required** | 一段 shape 的唯一标识 |

### shapes.txt

| Field Name          | Type                 | Required     | Description               |
| :------------------ | :------------------- | :----------- | :------------------------ |
| `shape_id`          | ID                   | **Required** |                           |
| `shape_pt_lat`      | Latitude             | **Required** | Latitude                  |
| `shape_pt_lon`      | Longitude            | **Required** | Longitude                 |
| `shape_pt_sequence` | Non-negative integer | **Required** | 该点位于 shape 中的序列号 |

>```
>'1': '1..N03R'
>```
>
>



## GTFS Realtime 结构

FeedEntity 中是 TripUpdate、Vehicle、TripUpdate、Vehicle、...... 的序列。

其中 TripUpdate 与 Vehicle 一一对应，`trip_id` 一致。

TripUpdate 与 Vehicle 示例：

```json
TripUpdate {
  stopTimeUpdate: [
    StopTimeUpdate {
      arrival: StopTimeEvent {
        time: Long { low: 1688621086, high: 0, unsigned: false }
      },
      departure: StopTimeEvent {
        time: Long { low: 1688621086, high: 0, unsigned: false }
      },
      stopId: 'H06S'
    },
    StopTimeUpdate {
      arrival: StopTimeEvent {
        time: Long { low: 1688621386, high: 0, unsigned: false }
      },
      departure: StopTimeEvent {
        time: Long { low: 1688621386, high: 0, unsigned: false }
      },
      stopId: 'H07S'
    },
    StopTimeUpdate {
      arrival: StopTimeEvent {
        time: Long { low: 1688621611, high: 0, unsigned: false }
      },
      departure: StopTimeEvent {
        time: Long { low: 1688621611, high: 0, unsigned: false }
      },
      stopId: 'H08S'
    },
    StopTimeUpdate {
      arrival: StopTimeEvent {
        time: Long { low: 1688621701, high: 0, unsigned: false }
      },
      departure: StopTimeEvent {
        time: Long { low: 1688621701, high: 0, unsigned: false }
      },
      stopId: 'H09S'
    },
    StopTimeUpdate {
      arrival: StopTimeEvent {
        time: Long { low: 1688621821, high: 0, unsigned: false }
      },
      departure: StopTimeEvent {
        time: Long { low: 1688621821, high: 0, unsigned: false }
      },
      stopId: 'H10S'
    },
    StopTimeUpdate {
      arrival: StopTimeEvent {
        time: Long { low: 1688621911, high: 0, unsigned: false }
      },
      departure: StopTimeEvent {
        time: Long { low: 1688621911, high: 0, unsigned: false }
      },
      stopId: 'H11S'
    }
  ],
  trip: TripDescriptor {
    tripId: '141095_A..S',
    startTime: '23:30:57',
    startDate: '20230705',
    routeId: 'A'
  }
}
```

> 其中每个 StopTimeUpdate 中的 arrival 与 departure 相同

```json
VehiclePosition {
  multiCarriageDetails: [],
  trip: TripDescriptor {
    tripId: '141095_A..S',
    startTime: '23:30:57',
    startDate: '20230705',
    routeId: 'A'
  },
  currentStopSequence: 51,
  currentStatus: 1,
  timestamp: Long { low: 1688620866, high: 0, unsigned: true },
  stopId: 'H04S'
}
```







## MTA 的 GTFS 解析










- EntitySelector
  - `string agency_id`
  - `string route_id`
  - `int32 route_type`
  - `TripDescriptor trip`
  - `string stop_id`



- VehicleDescriptor 标识
  - `string id`
  - `string label`
  - `string licence_plate`



- TripDescriptor

  - `string trip_id`

  - `string route_id`

  - `uint32 direction_id`

  - `string start_time`

  - `string start_date`

  - `ScheduleRelationship schedule_relationship`

    > ScheduleRelationship 为一个枚举类：
    >
    > - `SCHEDULED` Trip that is running in accordance with its GTFS schedule, or is close enough to the scheduled trip to be associated with it.
    > - `ADDED` An extra trip that was added in addition to a running schedule, for example, to replace a broken vehicle or to respond to sudden passenger load.
    > - `UNSCHEDULED` A trip that is running with no schedule associated to it, for example, if there is no schedule at all.
    > - `CANCELED` A trip that existed in the schedule but was removed.



- Position

  - `float latitude` Degrees North, in the WGS-84 coordinate system.

  - `float longitude` Degrees East, in the WGS-84 coordinate system.

  - `float bearing`

    Bearing, in degrees, clockwise from North, i.e., 0 is North and 90 is East.

    This can be the compass bearing, or the direction towards the next stopor intermediate location.

    This should not be direction deduced from the sequence of previous

    positions, which can be computed from previous data.

  - `double odometer` 里程表，单位为米

  - `float speed` Momentary speed measured by the vehicle, in meters per second.



- TimeRange

  - `uint64 start` Start time, in POSIX time (i.e., number of seconds since January 1st 1970 00:00:00 UTC). If missing, the interval starts at minus infinity.

  - `uint64 end` 

    End time, in POSIX time (i.e., number of seconds since January 1st 1970 00:00:00 UTC).



- TranslateString

  - Translation translation

    > Translation 结构如下
    >
    > - `string text`
    > - `string language`



- Alert

  An alert, indicating some sort of incident in the public transit network.

  - **TimeRange** `active_period`

    Time when the alert should be shown to the user.

    If missing, the alert will be shown as long as it appears in the feed.

    If multiple ranges are given, the alert will be shown during all of them.

  - **EntitySelector** `informed_entity`

    Entities whose users we should notify of this alert.

  - **Cause** `cause` Cause of this alert.

    > Cause 为一个枚举类，有如下取值：
    >
    > - `UNKNOWN_CAUSE`
    > - `OTHER_CAUSE` Not machine-representable.
    > - `TECHNICAL_PROBLEM`
    > - `STRIKE Public` transit agency employees stopped working.
    > - `DEMONSTRATION` People are blocking the streets.
    > - `ACCIDENT`
    > - `HOLIDAY`
    > - `WEATHER`
    > - `MAINTENANCE`
    > - `CONSTRUCTION`
    > - `POLICE_ACTIVITY`
    > - `MEDICAL_EMERGENCY`

  - **Effect** `effect` What is the effect of this problem on the affected entity.

    > Effect 为一个枚举类，有如下取值：
    >
    > - `NO_SERVICE`
    >
    > - `REDUCED_SERVICE`
    >
    >   We don't care about INsignificant delays: they are hard to detect, have little impact on the user, and would clutter the results as they are too frequent.
    >
    > - `SIGNIFICANT_DELAYS`
    >
    > - `DETOUR`
    >
    > - `ADDITIONAL_SERVICE`
    >
    > - `MODIFIED_SERVICE`
    >
    > - `OTHER_EFFECT`
    >
    > - `UNKNOWN_EFFECT`
    >
    > - `STOP_MOVED`

  - **TranslatedString** url

    The URL which provides additional information about the alert.

  - **TranslatedString** header_text

    Alert header. Contains a short summary of the alert text as plain-text.

  - **TranslatedString** description_text

```
FeedMessage {
	FeedHeader header {
		string gtfs_realtime_version
		enum Incrementality {
            FULL_DATASET
            DIFFERENTIAL
        }
        Incrementality incrementality = 2 [default = FULL_DATASET];
        timestamp = 3;
        
        // extensions
	}
	FeedEntity entity {
		string id
		bool is_deleted
		TripUpdate trip_update {
			TripDescriptor trip
			VehicleDescriptor vehicle
			StopTimeEvent {
				delay
				time
				uncertainty
				
				// extensions
			}
			StopTimeUpdate {
				stop_sequence
				stop_id
				StopTimeEvent arrival
				StopTimeEvent departure
				enum ScheduleRelationship {
                    SCHEDULED = 0;
                    SKIPPED = 1;
                    NO_DATA = 2;
                }
			}
			StopTimeUpdate stop_time_update
			timestamp
			delay
		}
		VehiclePosition vehicle {
			TripDescriptor trip {
				trip_id
				route_id
				direction_id
				start_time
				start_date
				enum ScheduleRelationship {
                    SCHEDULED
                    ADDED
                    UNSCHEDULED
					CANCELED = 3;
                }
			}
			VehicleDescriptor vehicle {
				id
				label
				license_plate
			}
			Position position {
				latitude
				longitude
				bearing
				odometer
				speed
			}
			current_stop_sequence
			stop_id
			enum VehicleStopStatus {
                INCOMING_AT
                STOPPED_AT
                IN_TRANSIT_TO
            }
            VehicleStopStatus current_status
            timestamp
            enum CongestionLevel {
                UNKNOWN_CONGESTION_LEVEL
                RUNNING_SMOOTHLY
                STOP_AND_GO
                CONGESTION
                SEVERE_CONGESTION
            }
            CongestionLevel congestion_level
            enum OccupancyStatus {
                EMPTY
                MANY_SEATS_AVAILABLE
                FEW_SEATS_AVAILABLE
                STANDING_ROOM_ONLY
                CRUSHED_STANDING_ROOM_ONLY
                FULL
                NOT_ACCEPTING_PASSENGERS
            }
            OccupancyStatus occupancy_status
		}
		Alert alert {
			TimeRange active_period {
				start
				end
			}
			EntitySelector informed_entity
			enum Cause {
                UNKNOWN_CAUSE
                OTHER_CAUSE
                TECHNICAL_PROBLEM
                STRIKE
                DEMONSTRATION
                ACCIDENT
                HOLIDAY
                WEATHER
                MAINTENANCE
                CONSTRUCTION
                POLICE_ACTIVITY
                MEDICAL_EMERGENCY
            }
            Effect {
                NO_SERVICE = 1;
                REDUCED_SERVICE = 2;

                SIGNIFICANT_DELAYS = 3;

                DETOUR = 4;
                ADDITIONAL_SERVICE = 5;
                MODIFIED_SERVICE = 6;
                OTHER_EFFECT = 7;
                UNKNOWN_EFFECT = 8;
                STOP_MOVED = 9;
            }
            TranslatedString url
            TranslatedString header_text
            TranslatedString description_text
		}
		
		// extentions
	}
}
```

## 参考

[MTA Developer Resources](https://api.mta.info/#/HelpDocument)

[GTFS 实时概览  | Realtime Transit  | Google for Developers](https://developers.google.com/transit/gtfs-realtime?hl=zh-cn)

[GTFS 实时协议缓冲区  | Realtime Transit  | Google for Developers](https://developers.google.com/transit/gtfs-realtime/gtfs-realtime-proto?hl=zh-cn)

[【Protobuf】使用Python实现Protobuf数据框架_python protobuf_Maple_66的博客-CSDN博客](https://blog.csdn.net/qq_41682740/article/details/126571153)

[解决python grpcio.protoc生成的pb文件里面没有类和方法定义的问题_python编译protobuf后没有类_做我的code吧的博客-CSDN博客](https://blog.csdn.net/yueguangMaNong/article/details/127502700)

[在python中使用protobuf - 简书 (jianshu.com)](https://www.jianshu.com/p/1aeb8ee87b99/)