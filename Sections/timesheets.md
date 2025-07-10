## Get All Time Entries

```
GET /timeentry
```

You should pagiante the results for time entries that are returned. Please see pagination reference here https://github.com/hubplanner/API/blob/master/README.md#pagination

```
GET /timeentry?page=0&limit=20
```

## Get Specific TimeEntry
Use the following command to get a specific TimeEntry by `id`.
```
GET /timeentry/12345678
```
Will return TimeEntry with the id `12345678`

```
{
      "_id": "12345678",
      "resource": "xxx",
      "project": "xxx",
      "projectName": "Customer Service",
      "projectType": "REGULAR",
      "projectStatus": "STATUS_ACTIVE",
      "date": "2016-03-07",
      "minutes": 240,
      "note": "",
      "createdDate": "2016-03-09T23:32:57.007Z",
      "updatedDate": "2016-11-03T06:40:15.668Z",
      "metadata": "",
      "status": "APPROVED",
      "locked": true,
      "creator": "xxx",
      "categoryTemplateId": "xxx",
      "categoryName": "Project Research"
}
```

A successful TimeEntry will return a `200` Ok response status from the server.

Property | Type | Description                                                                | Required | Sortable
--- | --- |----------------------------------------------------------------------------| --- | ---
_id | *string* | id of the TimeEntry                                                        | NO | NO
resource | *string* | id of the Resource                                                         | *YES* | NO
project | *string* | id of the Project                                                          | *YES* | NO
projectName | *string* | Project Name (Read Only)                                                   | NO | YES
projectType | *string* | Project Type (REGULAR, EVENT) (Read Only)                                  | NO | NO
projectStatus | *string* | Project Status (Active, Archived, Pending, Planned, Floating)(Read Only)   | NO | NO
date | *string* | ('YYYY-MM-DD') TimeEntry date                                              | *YES* | YES
minutes | *number* | How many minutes this entry is for                                         | *YES* | YES
note | *string* | Note on this entry                                                         | Depends on project configuration of setting `timeEntryNoteRequired` | NO
createdDate | *string* | Server date when entry was created (Read Only)                             | NO | YES
updatedDate | *string* | Server date when entry was last updated (Read Only)                        | NO | YES
metadata | *string* | Custom Field (255 Characters)                                              | NO | YES
status | *string* | Entry Status (UNSUBMITTED, SUBMITTED, APPROVED, REJECTED, PENDING, EMPTY*) | NO | YES
locked | *boolean* | Possible to update entry (read only)                                       | NO | NO
creator |*string* | Resource ID of who created this entry (Read Only)                          | NO | NO
categoryTemplateId |*string* | Category Template ID                                                       | NO | NO
categoryName |*string* | Category Template Name (Read Only)                                         | NO | YES

_*EMPTY status is used to fill in weekdays without time entries data. If week contains at least one time entry data, the other days in that week, will be filled in with EMPTY status entries._

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
```
{"date":{"$gte": "2014-10-20", "$lte": "2014-10-27"}}
```

### Search Parameters
Use paramters to narrow you search. For example use `$nin` for not included, and use `$in` for included.

Property | Parameters
--- | --- | ---
$nin | not included
$in | included
$lt | less than
$lte | less than or equal
$gt | greater than
$gte | greater than or equal

### Searchable Properties
Property | Parameters | Description
--- | --- | ---
_id | $nin, $in | booking id
metadata | $nin, $in | custom meta data field
date | $lt, $lte, $gte | date ('YYYY-MM-DD')
updatedDate | $lt, $lte, $gte | updated date range
resources | $nin, $in | resource id
project | $nin, $in | project id
status | $nin, $in | Entry Status (UNSUBMITTED, SUBMITTED, APPROVED, REJECTED, PENDING)

A successful search will return a `200` Ok response status from the server.

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

## Delete multiple TimeEntries
Use the following command to delete multiple TimeEntries by `id`.
```
DELETE /timeentry
```
Provide the array of ids in the request body. An example:
```
[
    "5ae1d7a2d61e560c4916aaaa",
    "5ae1d7a2d61e560c4926bbbb",
    "5ae1d7a2d61e560c4936cccc"
]
```

A successful delete will return a `204` Ok response status from the server.
