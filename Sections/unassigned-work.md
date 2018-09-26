## Get All Unassigned Work

```
GET /unassigned-work
```

call will return all unassigned work.

Server Response example below for 2 unassigned work returned within an array.

```
[
    {
        "_id": "5baa0e6ff9e84a0ccd4c1111",
        "value": "Unassigned work 1"
    },
    {
        "_id": "5baa1cc19db3c40cc3cc2222",
        "value": "Unassigned work 2"
    }
]
```

## Get Specific Unassigned Work

```
GET /unassigned-work/:id
```

call will return specific unassigned work by `id`.

Server Response example below:

```
{
    "_id": "5baa1cc19db3c40cc3cc2222",
    "value": "Unassigned work 2"
}
```

## Create a Unassigned Work
Create a new unassigned work.
```
POST /unassigned-work
```
An example of a unassigned work

```
{"value": "Unassigned work 3"}
```
The server will return the full unassigned work object once created including the newly created unassigned work ID `_id`. Only `value` property is supported in request body.

A successful create will return a `201` Ok response status from the server.

## Update a Unassigned Work
Update an existing unassigned work.
```
PUT /unassigned-work/123456789
```
will update the unassigned work with the id 123456789. You must pass in the entire unassigned work object in the body.

A successful update will return a `200` Ok response status from the server.

## Delete a Unassigned Work
Use the following command to delete a specific unassigned work by `id`.
```
DELETE /unassigned-work/12345678
```
Will delete unassigned work with the id `12345678`

A successful delete will return a `200` Ok response status from the server.