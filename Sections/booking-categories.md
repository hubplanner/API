## Get All Booking Categories

```
GET {{API_URL}}/categories
```
A response from the server would be as follows:
```
[
  {
      "_id": "5f057949f338cd432a794a12",
      "name": "At Client",
      "gridColor": "#81A489",
      "createdDate": "2020-07-08T07:44:09.929Z",
      "updatedDate": "2020-07-08T07:44:09.929Z",
      "type": "CUSTOM",
      "categoryGroupId": "66e81d231d512707a7266d32",
      "categoryGroupName": "Default group"
  }
]
```

The call will return an array of booking categories for your company.

Property type shows if the booking category is default in its group. It can be set as `NON_OPTIONAL` (default) or `CUSTOM`.

## Search a Booking Category

```
POST {{API_URL}}/categories/search
```
The body can be as follows:
```
{
	"type": "NON_OPTIONAL",
	"name": { "$like": "Video" }
}
```
Use the following command to search booking categories, it allows to get more complex results.

### Search Parameters
Use paramters to narrow you search. You can send exact values or use parameters below.

Parameters | Description
--- | ---
$in | values included in array
$nin | values excluded from array
$like | includes (also partial) string

### Searchable Properties
Property | Parameters  | Type
--- |-------------| ---
_id | $in, $nin   | *ID*
name | $in, $nin, $like | *string*
type | $in, $nin   | *string*
gridColor | $in, $nin   | *string*
group |             | *ID*

To get categories from other groups than default, there is extension **"Booking Category Groups"** required.

## Get a Booking Category by ID
Use the following command to get a specific booking category by id.

A successful resource will return a 200 Ok response status from the server.

```
GET {{API_URL}}/categories/{{CATEGORY_ID}}
```

## Create a Booking Category
In the body you have to send ID of the group to add new booking category.

Possible values of property `type` are `NON_OPTIONAL` and `CUSTOM`. Setting `type` to `NON_OPTIONAL` sets the new category as default one in the group.

A successful create operation will return a 201 OK response status from the server.

```
POST {{API_URL}}/categories
```

```
{
	"groupId": "5e62e12027a3df671be4582b",
	"name": "New Category",
	"gridColor": "#131215",
	"type": "NON_OPTIONAL"
}
```

## Update an Existing Booking Category
You must pass in the entire object in the body when updating so no values will be overwritten. Best practice will be to read first and then merge.

A successful update will return a 200 Ok response status from the server.

```
PUT {{API_URL}}/categories/{{CATEGORY_ID}}
```

```
{
    "name": "Video Shooting Category",
    "gridColor": "#C81930",
    "type": "CUSTOM"
}
```

## Get all Category Groups
```
GET {{API_URL}}/category-groups
```
The call will return an array of category groups for your company. 

The properties returned are displayed in example.
Property `type` shows if the category group is default. It can be set as `NON_OPTIONAL` (default) or `CUSTOM`.

To receive `CUSTOM` gorups, there is extension **"Booking Category Groups"** required.
