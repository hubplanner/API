## Get All Project Cost Categories

```
GET {{API_URL}}/costCategories
```
A response from the server would be as follows:
```
[
  {
      "_id": "5f057949f338cd432a794a12",
      "name": "Office",
      "createdDate": "2020-07-08T07:44:09.929Z",
      "updatedDate": "2020-07-08T07:44:09.929Z"
  }
]
```

The call will return an array of project cost categories for your company.

## Search a Project Cost Category

```
POST {{API_URL}}/costCategories/search
```
The body can be as follows:
```
{
	"name": "Office"
}
```
Use the following command to search project cost categories, it allows to get more complex results.

### Search Parameters
Use paramters to narrow you search. You can send exact values or use parameters below.

Parameters | Description
--- | ---
$in | values included in array
$nin | values excluded from array

### Searchable Properties
Property | Parameters | Type
--- | --- | ---
_id | $in, $nin | *ID*
name | $in, $nin | *string*

## Get a Project Cost Category by ID
Use the following command to get a specific project cost category by id.

A successful request will return a 200 Ok response status from the server.

```
GET {{API_URL}}/costCategories/{{COST_CATEGORY_ID}}
```

## Create a Project Cost Category

A successful create operation will return a 201 OK response status from the server.

```
POST {{API_URL}}/costCategories
```

```
{
	"name": "New Cost Category"
}
```

## Update an Existing Project Cost Category
You must pass in the entire object in the body when updating so no values will be overwritten. Best practice will be to read first and then merge.

A successful update will return a 200 Ok response status from the server.

```
PUT {{API_URL}}/costCategories/{{COST_CATEGORY_ID}}
```

```
{
    "name": "Business travels"
}
```

## Delete a Project Cost Category
Use the following command to delete a specific cost category by `id`.
```
DELETE /costCategories/12345678
```
Will delete cost category with the id `12345678`

A successful delete will return a `204` Ok response status from the server.
