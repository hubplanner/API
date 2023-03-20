## Get All Project Bookings

```
GET /booking
```
You should pagiante the results for bookings that are returned. Please see pagination reference here https://github.com/hubplanner/API/blob/master/README.md#pagination

```
GET /booking?page=0&limit=20
```
```
[
  {
        "_id": "5b1977ade02d407011112222",
        "title": "",
        "state": "STATE_PERCENTAGE",
        "type": "SCHEDULED",
        "allDay": true,
        "scale": "SCALE_DAY",
        "start": "2018-06-07T09:00",
        "end": "2018-06-09T18:00",
        "categoryTemplateId": "5aa0f2414a576d0c11112222",
        "categoryName": "General",
        "bookingCreatorId": "5aa0f2414a576d0c11112222",
        "stateValue": 100,
        "resource": "5ae1d7a2d61e560c11112222",
        "project": "5b06b094562dc80c11112222",
        "note": "",
        "details": {
            "offDaysCount": 0,
            "workDaysCount": 2,
            "holidayCount": 0,
            "workWeekDetails": [
                0,
                0,
                0,
                0,
                1,
                1,
                0
            ],
            "bookedMinutes": 960,
            "budgetBookedAmount": 0
        },
        "createdDate": "2018-06-07T18:21:33.144Z",
        "updatedDate": "2018-09-04T08:15:11.487Z",
        "metadata": "",
        "backgroundColor": "",
        "customFields": [],
        "bookingRate": {
            "external": {
                "defaultRateId": "5bab32f98a5a834311112222"
            },
            "internal": {
                "defaultRateId": "5bab32f98a5a834311113333"
            }
        },
        "lastUpdatedById": "5aa0f2414a576d0c11112222"
    }
]
  ```
The following is a description of the properties in the response.

Property | Type | Description | Required | Sortable
--- | --- | --- | --- | ---
_id | *string* | id of the Booking | NO | NO
title | *string* | Booking Tile | NO | YES
state | *string* | Booking State (see Below) | NO | YES
allDay | *boolean* | If created in day view or not | NO | NO
start | *string* | booking start date (for hourly creation pass in hours, see below) | *YES* | YES
end | *string* | booking end date (for hourly creation pass in hours, see below) | *YES* | YES
stateValue | *integer* | booking state value (depends on booking state) - will be 0 unless set | NO | YES
resource | *string* | Resource ID | *YES* | NO
project | *string* | Project ID | *YES* | NO
note | *string* | Booking Note | NO | NO
details | *object* | Booking Details | NO | NO
createdDate | *string* | Created Date | NO | YES
updatedDate | *string* | Updated Date | NO | YES
metadata | *string* | Custom Field | NO | YES
customFields | *string* | All resource custom fields | NO | NO
bookingCreatorId | *string* | Id of booking creator | NO | NO
bookingRate | *object* | References booking rates | NO | NO
lastUpdatedById | *string* | id of resource who last updated the booking | NO | NO

The following table shows the different types of booking states that can be returned and their implication on which property they use for the booking time. 

Booking State | Description
--- | ---
STATE_DAY_MINUTE | the `stateValue` is the minutes per day for the booking. e.g. 480 would be 8hrs
STATE_PERCENTAGE | the `stateValue` is the percentage of the daily commitment
STATE_TOTAL_MINUTE | the `stateValue` is the total minutes for the booking from start to end

### Booking Type

Booking type is returned as a read only property. The possible types are as follows:

Booking Type | Description
--- | ---
SCHEDULED | when a booking is scheduled in the scheduler.
APPROVED | when using the requesting & approval flow extension and the booking is approved.
WAITING_FOR_APPROVAL | when using the requesting & approval flow extension and the booking is requested / pending / waiting for approval.
REJECTED | when using the requesting & approval flow extension and the booking is rejected.

### Billing rates

To set billing rates for the booking You can use `bookingRate` field. The `bookingRate` is structured as follows:

```
"bookingRate": {
    "external": {
        "defaultRateId": "5bab32f98a5a834311112222"
    },
    "internal": {
        "defaultRateId": "5bab32f98a5a834311113333"
    }
}
```

Rates are split to internal rates and external rates. You need to have billing rates extension enabled to use internal rates. You can provide the id of billing rate used in your company for `defaultRateId` field. Rate is assigned automatically from the billing rate. You can read more on billing rate management under [billing rates](https://github.com/hubplanner/API/blob/master/Sections/billingrate.md).

### Retrieving deleted bookings

To retrieve deleted bookings use query parameter *deleted*
```
GET booking?deleted=true
```


## Search Bookings
Search allows to get more complex results.

```
POST booking/search
```

Examples:

If you only want to get bookings with ids `123`, `456` and `789`
```
{"_id": {"$in": ["123", "456", "789"]} }
```
Similarly, if you want to get all bookings with ids other than `123`, `456` and `789`
```
{"_id": {"$nin": ["123", "456", "789"]} }
```
If you only want all bookings for a resource id `123`
```
{"resource":"123"}
```
If you want to get all bookings for resources with ids: `123` and `456`:
```
{"resource": {"$in": ["123", "456"]} }
```
If you only want all bookings for a project id `456`
```
{"project":"456"}
```
If you want to query all bookings for a date range:
```
{"start": {"$lt": "2014-07-15"}, "end":{"$gte": "2014-07-01"} }
```

### Search Parameters
Use paramters to narrow you search. For example use `$nin` for not included, and use `$in` for included.

Property | Parameters
--- | --- | ---
$nin | not included
$in | included
$lt | less than
$lte | less than or equal
$gte | greater than

### Searchable Properties
Property | Parameters | Description
--- | --- | ---
_id | $nin, $in | booking id
metadata | $nin, $in | custom meta data field
start | $lt, $lte, $gte | start date range
end | $lt, $lte, $gte | end date range
updatedDate | $lt, $lte, $gte | updated date range
resources | $nin, $in | resource id
project | $nin, $in | project id

A successful search will return a `200` Ok response status from the server.

## Get Specific Booking
Use the following command to get a specific booking by `id`.
```
GET /booking/12345678
```
Will return booking with the id `12345678`

A successful booking will return a `200` Ok response status from the server.

## Create a new Booking
Create a new booking.
```
POST /booking
```
An example of a booking for resource id `5992a4a6e333b50c3c721c51` on project id `5992a4a6e583b5333c721c6d`. Note: These are the minimum required fields. 

```
{
    "resource" : "5992a4a6e333b50c3c721c51",
    "start" : "2014-11-03",
    "end" : "2014-11-19",
    "project" : "5992a4a6e583b5333c721c6d"
}
```
If you do not pass in `stateValue` it will be set to zero, so common practice is to pass in a `stateValue` when creating a booking. Please also be aware if you do not pass in a `state` the default will be used which is detrmined in your UI and usually `STATE_PERCENTAGE`

for example when booking 8hrs

```
{
    "resource" : "5992a4a6e333b50c3c721c51",
    "start" : "2014-11-03",
    "end" : "2014-11-19",
    "project" : "5992a4a6e583b5333c721c6d",
    "state" : "STATE_DAY_MINUTE",
    "stateValue" : 480
}
```

## Create a new Booking Request
To create a new booking request you need to make sure you have the resource request extension installed. The booking object is the same, you only need to pass in a type of `WAITING_FOR_APPROVAL` to make the booking a request. Example

```
{
    "resource" : "5992a4a6e333b50c3c721c51",
    "start" : "2023-11-03",
    "end" : "2023-11-19",
    "project" : "5992a4a6e583b5333c721c6d",
    "type" : "WAITING_FOR_APPROVAL"
}
```

## Create a Booking in Hours View
You will need to make sure to pass in the following object. Note the start and End include the hours and you do not pass in a `stateValue` and you set `allDay` to `false`.

```
{
    "resource" : "5992a4a6e333b50c3c721c51",
    "start" : "2017-08-21 10:00",
    "end" : "2017-08-21 15:00",
    "project" : "5992a4a6e583b5333c721c6d",
    "allDay" : false,
    "state" : "STATE_DAY_MINUTE"
}
```

The server will return the full booking object once created including the newly created booking ID `_id`

A successful create will return a `201` Ok response status from the server.

## Update a booking
Update an existing booking.
```
PUT /booking/123456789
```
will update the booking with the id 123456789. You must pass in the entire booking object in the body. 

A successful update will return a `200` Ok response status from the server.

## Patch the booking
Patch an existing booking.
```
PATCH /booking/123456789
```
will patch the booking with the id 123456789. Unlike PUT, you don't have to pass in the entire booking object, only the properties that you want to modify.

A successful update will return a `200` Ok response status from the server and updated booking.

## Delete a booking
Use the following command to delete a specific booking by `id`.
```
DELETE /booking/12345678
```
Will delete booking with the id `12345678`

A successful delete will return a `200` Ok response status from the server.

## Delete multiple bookings (Bulk)
Use the following query to delete multiple bookings, either by booking IDs, projectId or resourceId.

Delete multiple bookings by booking IDs:
```
DELETE /booking?ids=12340,12341,12342,12343,12344
```
Will delete multiple bookings with the IDs: `12340`, `12341`, `12342`, `12343`, `12344`.

Delete multiple bookings by resourceId:
```
DELETE /booking?resourceId=12345
```
Will delete all bookings for the resource with ID `12345`.

Delete multiple bookings by projectId:
```
DELETE /booking?projectId=12346
```
Will delete all bookings for the project with ID `12346`.

A successful delete will return a `200` Ok response status from the server with resulting message and count of deleted bookings.
