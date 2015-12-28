#¯\\\_(ツ)\_/¯ -server

###about
you can ¯\\\_(ツ)\_/¯ on the internet with it.
All API endpoints are under `/api/` and require a query or body parameter of `key` containing a top-secret only-donald-trump-and-donald-duck-know-about-it classified api key.

###endpoints

####¯\\\_(ツ)\_/¯
¯\\\_(ツ)\_/¯ something by foursquare ID.

#####example call:
```
POST /api/welp/4b5379aef964a520dc9e27e3?key=[KEY]
```
and it shall be welped or error out or whatever

####nearby
Get nearby places via foursquare formatted for consumption by the app.

params        | description   | example       | required      | default       |
------------- | ------------- | ------------- | ------------- | ------------- |
lat           | the latitude  | 42.020202     | yes           | n/a           |
lng           | the longitude | -71.222928    | yes           | n/a           |
limit         | # of venues   | 3             | no            | 1             |

#####example call:
```
GET /api/nearby?key=[KEY]&lat=42.3653402&lng=-71.106651&limit=3
```
#####response:
```json
[
    {
        "foursquareId": "4c37afdf3849c928f52ebeb1",
        "name": "Central Square",
        "location": [
            42.365579622404894,
            -71.10404133796692
        ],
        "distance": 216,
        "welpCount": 5
    },
    ...
]
```

####recommend
Get recommended places nearby.
#####NOTE: this currently only returns places that have already been welped at least once.
#####TODO: include "welpable" places from foursquare in this query.

params        | description           | example       | required      | default       |
------------- | --------------------- | ------------- | ------------- | ------------- |
lat           | the latitude          | 42.020202     | yes           | n/a           |
lng           | the longitude         | -71.222928    | yes           | n/a           |
limit         | # of venues           | 3             | no            | 10            |
minDistance   | min distance, in feet | 10            | no            | 0             |
maxDistance   | max distance, in feet | 1000          | no            | 1000          |


#####example call:
```
GET /api/recommend?key=[KEY]&lat=42.3653402&lng=-71.106651&limit=15&minDistance=5&maxDistance=500
```
#####response:
```json
[
    {
        "name": "The Field",
        "foursquareId": "3fd66200f964a5204ff11ee3",
        "welpCount": 2,
        "location": [
            42.365861034213765,
            -71.10354244709015
        ],
        "distance": 860
    },
    ...
]
```
