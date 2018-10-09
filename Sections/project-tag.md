## Get All Project tags

```
GET /project-tag
```
A response from the server would be as follows:
```
[
    {
        "_id": "5aa0f6394a576d0c22221111",
        "value": "marketing",
        "category": "PROJECT"
    },
    {
        "_id": "5aa0f63c4a576d0c11112222",
        "value": "sales",
        "category": "PROJECT"
    }
]
```
The following is a description of the properties in the response.

Property | Type | Description | Required
--- | --- | --- | ---
_id | *string* | id of the project tag | NO
value | *string* | project tag value | *YES*
category | *string* | project tag category | NO

## Create a new Project tag
Create a new Project tag.
```
POST /project-tag
```
An example of a request body:
```
{ 
  "value":"IT"
}
```
The body passed does not allow any other fields than `value`.

The server will return the project tag object once created including the newly created project tag ID `_id`

A successful create will return a `201` Ok response status from the server.

## Update a Project tag
Update an existing Project tag.
```
PUT /project-tag/123456789
```
will update the Project tag with the id 123456789. You must pass in the body:
```
{ 
  "value":"IT legacy"
}
```

Update value to already existing Project tag value is not allowed and will produce such response:
```
{
    "message": "This tag already exists.",
    "error": "TAG_VALUE_EXIST",
    "code": "A08TAG",
    "properties": {},
    "version": 2
}
```

A successful update will return a `200` Ok response status from the server and updated project tag.

## Delete a Project tag
Use the following command to delete a specific Project tag by `id`.
```
DELETE /project-tag/12345678
```
Will delete Project tag with the id `12345678`

A successful delete will return a `204` No content response status from the server. If object doesn't exist, server will return `404` Not found.
