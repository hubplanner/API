## Get All Holidays

```
GET /holiday
```
A response from the server would be as follows:
```
[{ _id: '54785431e91e5ead13e8d841',
  name: 'Christmas'
  date: '2014-12-25'
  metadata: '' 
}]
  ```
The following is a description of the properties in the response.

Property | Type | Description
--- | --- | ---
_id | *string* | id of the Holiday
name | *string* | Holiday Name
date | *string* | Holiday date
metadata | *string* | Custom Field

## Search Holidays
```
POST holiday/search
```
If you want to query all Holidays for a date range:
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
name | $nin, $in | Holiday Name

A successful search will return a `200` Ok response status from the server.

## Get Specific Holidays
Use the following command to get a specific booking by `id`.
```
GET /holiday/12345678
```
Will return Holiday with the id `12345678`

A successful request will return a `200` Ok response status from the server.

## Create a new Holiday
Create a new Holiday.
```
POST /holiday
```
An example of a Holiday on Christmas

```
{ 
  name: 'Christmas 2014'
  date: '2014-12-25'
}
```
The server will return the full holiday object once created including the newly created holiday ID `_id`

A successful create will return a `201` Ok response status from the server.

## Update a holiday
Update an existing holiday.
```
PUT /holiday/123456789
```
will update the holiday with the id 123456789. You must pass in the entire holiday object in the body. 

A successful update will return a `200` Ok response status from the server.

## Delete a holiday
Use the following command to delete a specific holiday by `id`.
```
DEL /holiday/12345678
```
Will delete holiday with the id `12345678`

A successful delete will return a `200` Ok response status from the server.
