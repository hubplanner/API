## Get All Resource tags

```
GET /resource-tag
```
A response from the server would be as follows:
```
[
    {
        "_id": "5aa0f6394a576d0c22221111",
        "value": "PHP",
        "category": "RESOURCE"
    },
    {
        "_id": "5aa0f63c4a576d0c11112222",
        "value": "Java",
        "category": "RESOURCE"
    }
]
```
The following is a description of the properties in the response.

Property | Type | Description | Required
--- | --- | --- | ---
_id | *string* | id of the Resource tag | NO
value | *string* | Resource tag value | *YES*
category | *string* | Resource tag category | NO

## Create a new Resource tag
Create a new Resource tag.
```
POST /resource-tag
```
An example of a request body:
```
{ 
  "value":"Ruby"
}
```
The body passed does not allow any other fields than `value`.

The server will return the Resource tag object once created including the newly created Resource tag ID `_id`

A successful create will return a `201` Ok response status from the server.

## Update a Resource tag
Update an existing Resource tag.
```
PUT /resource-tag/123456789
```
will update the Resource tag with the id 123456789. You must pass in the body:
```
{ 
  "value":"Python"
}
```

Update value to already existing Resource tag value is not allowed and will produce such response:
```
{
    "message": "This tag already exists.",
    "error": "TAG_VALUE_EXIST",
    "code": "A08TAG",
    "properties": {},
    "version": 2
}
```

A successful update will return a `200` Ok response status from the server and updated Resource tag.

## Delete a Resource tag
Use the following command to delete a specific Resource tag by `id`.
```
DELETE /resource-tag/12345678
```
Will delete Resource tag with the id `12345678`

A successful delete will return a `204` No content response status from the server. If object doesn't exist, server will return `404` Not found.
