## Resource Dynamic Capacity

Resource Dynamic Capacity allows you to set custom availability overrides for a resource on specific dates. This is useful when a resource has a different schedule on certain days — for example, working shorter hours on a specific date, or marking a day as completely unavailable.

See here for more feature details https://hubplanner.com/kb/set-dynamic-capacity-for-your-team-of-resources/

### CustomAvailabilityOverride Object

```
{
    "_id": "65f2a71a3060583a40315160",
    "resourceId": "65aa1d13d1428241e0b4a7a1",
    "from": "2023-10-05",
    "to": "2023-10-05",
    "minutes": 90,
    "intervals": [
        {
            "start": 120,
            "end": 210,
            "_id": "65f2a9627ced1d32b08ec294"
        }
    ],
    "createdDate": "2024-03-14T07:28:26.591Z",
    "updatedDate": "2024-03-14T07:38:10.219Z"
}
```
The following is a description of the properties in the response.

Property | Type | Description | Required | Sortable
--- | --- | --- | --- | ---
_id | *string* | id of the custom availability override | NO | NO
resourceId | *string* | id of the Resource this override applies to | *YES* | NO
from | *string* | Start date in `YYYY-MM-DD` format | *YES* | NO
to | *string* | End date in `YYYY-MM-DD` format | *YES* | NO
minutes | *number* | Total minutes calculated from intervals. This is computed by the system and cannot be set directly. | NO | NO
intervals | *object array* | Minute-of-day time ranges defining availability. Pass an empty array `[]` to mark the day as completely unavailable. | *YES* | NO
createdDate | *string* | Override creation date | NO | NO
updatedDate | *string* | Override last updated date | NO | NO

#### Interval Object

Each interval defines a start and end time as minutes from midnight.

Property | Type | Description | Required
--- | --- | --- | ---
_id | *string* | id of the Interval | NO
start | *number* | Minute of day where midnight is `0` (e.g. `60` = 01:00, `120` = 02:00). Must be a multiple of `15`. | *YES*
end | *number* | Minute of day where midnight is `0` (e.g. `210` = 03:30, `480` = 08:00). Must be a multiple of `15` and greater than `start`. | *YES*

Intervals must be in non-overlapping, ascending order: each interval's `start` must be `>=` the previous interval's `end`.

## Get Custom Availability Override by ID

```
GET /customAvailabilityOverride/{{OVERRIDE_ID}}
```
Will return the custom availability override with the specified `OVERRIDE_ID`.

Server Response example below for a single override.
```
{
    "_id": "65f2a71a3060583a40315160",
    "minutes": 90,
    "from": "2023-10-05",
    "to": "2023-10-05",
    "resourceId": "65aa1d13d1428241e0b4a7a1",
    "intervals": [
        {
            "start": 120,
            "end": 210,
            "_id": "65f2a9627ced1d32b08ec294"
        }
    ],
    "createdDate": "2024-03-14T07:28:26.591Z",
    "updatedDate": "2024-03-14T07:38:10.219Z"
}
```

A successful request will return a `200` Ok response status from the server.

## Get Custom Availability Overrides by Resource ID

```
GET /customAvailabilityOverride/findByResourceId/{{RESOURCE_ID}}
```
Will return all custom availability overrides for the resource with the specified `RESOURCE_ID`. Returns an empty array if the resource has no overrides.

Server Response example below for overrides returned within an array.
```
[
    {
        "_id": "65f2a71a3060583a40315160",
        "minutes": 90,
        "from": "2023-10-05",
        "to": "2023-10-05",
        "resourceId": "65aa1d13d1428241e0b4a7a1",
        "intervals": [
            {
                "start": 120,
                "end": 210,
                "_id": "65f2a9627ced1d32b08ec294"
            }
        ],
        "createdDate": "2024-03-14T07:28:26.591Z",
        "updatedDate": "2024-03-14T07:38:10.219Z"
    }
]
```

A successful request will return a `200` Ok response status from the server.

## Create a Custom Availability Override

```
POST /customAvailabilityOverride
```
Create a new custom availability override for a resource.

An example request body:
```
{
    "resourceId": "65aa1d13d1428241e0b4a7a1",
    "from": "2023-10-05",
    "to": "2023-10-05",
    "intervals": [
        {
            "start": 120,
            "end": 150
        }
    ]
}
```

The `resourceId`, `from`, `to`, and `intervals` fields are all required. The date range must not overlap with any existing override for the same resource.

The server will return the full override object once created, including the newly created override ID `_id` and the system-calculated `minutes` field.

A successful create will return a `201` Created response status from the server.

#### Mark a Day as Unavailable

To mark a day as completely unavailable, pass an empty `intervals` array. The system will calculate `minutes` as `0`.

```
{
    "resourceId": "65aa1d13d1428241e0b4a7a1",
    "from": "2023-10-06",
    "to": "2023-10-06",
    "intervals": []
}
```

#### Create Multiple Custom Availability Overrides

To create multiple custom availability overrides, use the same endpoint and pass all objects in an array `[]`.

```
[
    {
        "resourceId": "65aa1d13d1428241e0b4a7a1",
        "from": "2023-10-05",
        "to": "2023-10-05",
        "intervals": [
            {
                "start": 120,
                "end": 150
            }
        ]
    },
    {
        "resourceId": "65aa1d13d1428241e0b4a7a1",
        "from": "2023-10-06",
        "to": "2023-10-06",
        "intervals": [
            {
                "start": 60,
                "end": 300
            }
        ]
    }
]
```

## Update a Custom Availability Override

```
PUT /customAvailabilityOverride/{{OVERRIDE_ID}}
```
Will update the custom availability override with the specified `OVERRIDE_ID`. You must pass in the full override object in the body — this is a full replacement, not a partial update.

An example request body:
```
{
    "resourceId": "65aa1d13d1428241e0b4a7a1",
    "from": "2023-10-05",
    "to": "2023-10-05",
    "intervals": [
        {
            "start": 120,
            "end": 210
        }
    ]
}
```

All fields (`resourceId`, `from`, `to`, `intervals`) are required. The same date-range conflict check applies as with create — the override being updated is excluded from the conflict check, so updating an override without changing its date range is allowed.

A successful update will return a `200` Ok response status from the server.

## Delete a Custom Availability Override

```
DELETE /customAvailabilityOverride/{{OVERRIDE_ID}}
```
Will delete the custom availability override with the specified `OVERRIDE_ID`.

A successful delete will return a `204` No Content response status from the server.
