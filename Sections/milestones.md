## Get All Milestones

```
GET /milestone
```
A response from the server would be as follows:
```
[{ _id: '54785431e91e5ead13e8d841',
  name: 'Delivery Phase 1'
  date: '2014-07-15'
  project: '54785431e91e5ead13e8d841'
  metadata: '' 
}]
  ```
The following is a description of the properties in the response.

Property | Type | Description
--- | --- | ---
_id | *string* | id of the Milestone
name | *string* | Milestone Name
date | *string* | Milestone date
project | *string* | Project ID
metadata | *string* | Custom Field

## Search Milestones
```
POST milestone/search
```
If you only want all milestones for a project id `456`
```
{"project":"456"}
```
If you want to query all milestones for a date range:
```
{"date": {"$lt": "2014-07-15"} }
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
_id | $nin, $in | Holiday id
metadata | $nin, $in | custom meta data field
date | $lt, $lte, $gte | date
name | $nin, $in | Milestone Name
project | $nin, $in | project id

A successful search will return a `200` Ok response status from the server.

## Get Specific Milestone
Use the following command to get a specific booking by `id`.
```
GET /milestone/12345678
```
Will return milestone with the id `12345678`

A successful milestone will return a `200` Ok response status from the server.

## Create a new Booking
Create a new booking.
```
POST /milestone
```
An example of a milestone on project id `5678`. Note: These are the minimum required fields. 

```
{ 
  name: 'Delivery Phase 1'
  date: '2014-07-15'
  project: '54785431e91e5ead13e8d841'
}
```
The server will return the full milestone object once created including the newly created milestone ID `_id`

A successful create will return a `201` Ok response status from the server.

## Update a milestone
Update an existing milestone.
```
PUT /milestone/123456789
```
will update the milestone with the id 123456789. You must pass in the entire milestone object in the body. 

A successful update will return a `200` Ok response status from the server.

## Delete a milestone
Use the following command to delete a specific milestone by `id`.
```
DEL /milestone/12345678
```
Will delete milestone with the id `12345678`

A successful delete will return a `200` Ok response status from the server.
