## Get All Time Entries

```
GET /timeentry
```

This call will return an empty array `[]` due to the amount of data that could be return. You must specify a project or resource to `GET` timeEntry.

## Get Specific TimeEntry
Use the following command to get a specific TimeEntry by `id`.
```
GET /timeentry/12345678
```
Will return TimeEntry with the id `12345678`

```
{
  _id: "12345678",
  resource: 1234,
  project: 4567,
  date: "2014-11-18",
  minutes: 480,
  note: "",
  metadata: ""
}
```

A successful TimeEntry will return a `200` Ok response status from the server.

## Create a TimeEntry
Create a new TimeEntry.
```
POST /timeentry
```
An example of a TimeEntry, all are required fields below. 

```
{
   "resource":"1234",
   "project":"5678",
   "date":"2014-11-18",
   "minutes":480
}
```
The server will return the full TimeEntry object once created including the newly created TimeEntry ID `_id`

A successful create will return a `201` Ok response status from the server.

## Search TimeEntry
```
POST timeentry/search
```
If you only want all TimeEntry for a resource id `123`
```
{"resource":"123"}
```
If you only want all TimeEntry for a project id `456`
```
{"project":"456"}
```
If you want to query all TimeEntry for a date range:

## Update a TimeEntry
Update an existing TimeEntry.
```
PUT /timeentry/123456789
```
will update the TimeEntry with the id 123456789. You must pass in the entire TimeEntry object in the body. 

A successful update will return a `200` Ok response status from the server.

## Delete a TimeEntry
Use the following command to delete a specific TimeEntry by `id`.
```
DELETE /timeentry/12345678
```
Will delete TimeEntry with the id `12345678`

A successful delete will return a `200` Ok response status from the server.
