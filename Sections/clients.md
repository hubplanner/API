## Get All Clients

```
GET /client
```
Returns the list of Clients, e.g.:
```
[
    {
        "_id": "59c9fa822eb949496346ed85",
        "name": "customer2",
        "company": "59c9f8b531cd6d49506f84b0",
        "__v": 0,
        "updatedDate": "2017-09-26T07:00:30.083Z",
        "createdDate": "2017-09-26T06:58:10.528Z",
        "deleted": false
    },
    {
        "_id": "59cb3a0c242639540481a196",
        "name": "customer1",
        "company": "59c9f8b531cd6d49506f84b0",
        "__v": 0,
        "createdDate": "2017-09-27T05:41:32.059Z",
        "deleted": false
    }
]
```
The following is a description of the properties in the response.

Property | Type | Description      | Required | Sortable
--- | --- |------------------|----------| ---
_id | *string* | id of the Client | NO       | NO
name | *string* | Client name      | YES      | YES
metadata | *string* | Client metadata  | NO       | NO
createdDate | *string* | Created Date     | NO       | YES
updatedDate | *string* | Updated Date     | NO       | YES
deleted | *boolean* | Deleted Date     | NO       | NO

## Search Clients
```
POST client/search
```
If you only want a client with certain name as `customer1`.

```
{"name" : "customer1" }
```
will return all clients which are NOT `customer2`
```
{"name" : {"$nin": ["customer2"] } }
```
will return all clients which have `112233` and `1d39e0` values in metadata
```
{"metadata" : {"$in": ["112233", "11d39e0"] } }
```
will return all clients which have partially `11` in value in metadata
```
{"metadata" : {"$like": "11" } }
```

### Search Parameters
Use paramters to narrow you search. For example use `$nin` for not included, and use `$in` for included.

Property | Parameters
--- | ---
$nin | not included
$in | included
$like | includes (also partial) string

### Searchable Properties
Property | Parameters       | Description
--- |------------------| ---
metadata | $nin, $in, $like | custom meta data field
name | $nin, $in, $like      | project name

A successful search will return a `200` Ok response status from the server.

## Create a new Client
```
POST /client
```
An example of a Client
```
{"name": "sample_client"}
```
The server will return the full client object once created including the newly created project ID `_id`
```
{
    "__v": 0,
    "name": "sample_client",
    "company": "59cb8941996b735a1d018af3",
    "_id": "59cb91f41900f95ce6961d24",
    "createdDate": "2017-09-27T11:56:36.901Z",
    "deleted": false
}
```
## Update an existing Client
```
PUT /client/123456789012
```
will update the Client with the id 123456789023. Only "name" property update is available"
```
{"name": "sample_updated_client"}
```
A successful update will return a `200` Ok response status from the server.
## Delete a Client
Use the following command to delete an existing Client by `id`.
```
DELETE /client/123456789012
```
Will delete Client with the id `123456789012`

A successful delete will return a `200` Ok response status from the server.
## Get an existing Client
Use the following command to get a specific Client by `id`.
```
GET /client/123456789012
```
Will return project with the id `123456789012`

The server should return the full Client object and a `200` Ok response status.
{
    "_id": "59cb91f41900f95ce6961d24",
    "name": "sample_client",
    "company": "59cb8941996b735a1d018af3",
    "__v": 0,
    "createdDate": "2017-09-27T11:56:36.901Z",
    "deleted": false
}
