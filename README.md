#¯\\\_(ツ)\_/¯ -server

###about
you can ¯\\\_(ツ)\_/¯ on the internet with it.
All API endpoint are under `/api/` and require a query parameter of `key` containing a top-secret only-donald-trump-and-donald-duck-know-about-it classified api key.

###endpoints

####¯\\_(ツ)_/¯
¯\\_(ツ)_/¯ something by foursquare ID.

*example call:*
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

*example call:*
```
GET /api/nearby?key=[KEY]&lat=42.3653402&lng=-71.106651&limit=3
```
*result:*
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
    {
        "foursquareId": "4b5379aef964a520dc9e27e3",
        "name": "James Cronin Park",
        "location": [
            42.3652367739202,
            -71.10660284757614
        ],
        "distance": 12,
        "welpCount": 0
    },
    {
        "foursquareId": "4dd0c0f781dc3dc265f0fb55",
        "name": "p²",
        "location": [
            42.365288,
            -71.106677
        ],
        "distance": 6,
        "welpCount": 0
    }
]
```

####TODO: recommendations 
recommendations based both on welps 'awarded' nearby and some to-be-cooked-up analysis of foursquare.



