## Get All Project Bookings

```
GET /booking
```
A response from the server would be as follows:
```
[{ _id: '54785431e91e5ead13e8d841',
  title: '',
  state: 'STATE_DAY_MINUTE',
  allDay: true,
  start: '2014-11-03 08:00',
  end: '2014-11-19  18:00',
  stateValue: 50,
  resource: '5478423c406ca4620b3a1354',
  project: '5478396825044c9b060f9a61',
  note: '',
  details:
   { workDaysCount: 13,
     offDaysCount: 4,
     workWeekDetails: { '0': 0, '1': 3, '2': 3, '3': 3, '4': 2, '5': 2, '6': 0 },
     bookedMinutes: 6240,
     budgetBookedAmount: 0 },
  createdDate: '2014-11-28T10:53:37.469Z',
  updatedDate: '2014-11-28T10:53:37.470Z',
  metadata: '' 
}]
  ```
The following is a description of the properties in the response.

Property | Type | Description
--- | --- | ---
_id | *string* | id of the Booking
title | *string* | Booking Tile
state | *string* | Booking State (see Below)
allDay | *boolean* | If created in day view or not
start | *string* | booking start date
end | *string* | booking end date
stateValue | *integer* | booking state value (depends on booking state)
resource | *string* | Resource ID
project | *string* | Project ID
note | *string* | Booking Note
details | *object* | Booking Details
createdDate | *string* | Created Date
updatedDate | *string* | Updated Date
metadata | *string* | Custom Field

The following table shows the different types of booking states that can be returned and their implication on which property they use for the booking time. 

Booking State | Description
--- | ---
STATE_DAY_MINUTE | the `stateValue` is the minutes per day for the booking
STATE_PERCENTAGE | the `stateValue` is the total minutes for the booking from start to end
STATE_TOTAL_MINUTE | the `stateValue` is the percentage of the daily commitment


## Search Bookings
```
POST booking/search
```
If you only want all bookings for a resource id `123`
```
{"resource":"123"}
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
An example of a booking for resource id `1234` on project id `5678`. Note: These are the minimum required fields. 

```
{
    "resource" : "1234",
    "start" : "2014-11-03 08:00",
    "end" : "2014-11-19 18:00",
    "project" : "5678"
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

## Delete a booking
Use the following command to delete a specific booking by `id`.
```
DEL /booking/12345678
```
Will delete booking with the id `12345678`

A successful delete will return a `200` Ok response status from the server.
