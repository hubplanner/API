## Add Events to Resources
Please look at Bookings. It is the exact same process except you use the event ID instead of project Booking ID. 

```
GET /event
```

call will return all projects.

Server Response example below for 1 project returned within an array. 

```
[{  _id: '53a168304cc0f1bb16a898ca',
    name: '788',
    createdDate: '',
    updatedDate: '',
    backgroundColor: '',
    metadata: '' 
}]
```

Property | Type | Description | Required
--- | --- | --- | ---
_id | *string* | id of the project | NO
name | *string* | Event name | *YES*
createdDate | *string* | Event Creation Date | NO
updatedDate | *string* | Event Updated Date | NO
backgroundColor | *string* | Event Color | NO
metadata | *string* | Custom Field | NO

## Search Events
```
POST event/search
```
Search by name
```
{"name" : "Conference Day" }
```

## Get Specific Event
Use the following command to get a specific event by `id`.
```
GET /event/12345678
```
Will return event with the id `12345678`

A successful event will return a `200` Ok response status from the server.

## Create a Event
Create a new event.
```
POST /event
```
An example of a event

```
{"name": "Photo Shoot"}
```
The server will retyrn the full event object once created including the newly created event ID `_id`

A successful create will return a `201` Ok response status from the server.

## Update a Event
Update an existing event.
```
PUT /event/123456789
```
will update the event with the id 123456789. You must pass in the entire event object in the body. 

A successful update will return a `200` Ok response status from the server.

## Delete a Event
Use the following command to delete a specific event by `id`.
```
DELETE /event/12345678
```
Will delete event with the id `12345678`

A successful delete will return a `200` Ok response status from the server.
