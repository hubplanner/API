## Get All Booking Categories

```
GET /categories
```

The call will return an array of booking categories for your company.

Server Response example below for 1 category returned within an array.

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

The following is a description of the properties in the response.

Property | Type | Description | Required | Sortable
--- | --- | --- | --- | ---
_id | *string* | id of the Booking Category | NO | NO
name | *string* | Category Name | NO | YES
gridColor | *string* | Hex color code (e.g. `#81A489`) | NO | YES
createdDate | *string* | Category Creation Date | NO | NO
updatedDate | *string* | Category Updated Date | NO | NO
type | *string* | `NON_OPTIONAL` (default) or `CUSTOM` | NO | YES
categoryGroupId | *string* | ID of the category group this category belongs to | NO | NO
categoryGroupName | *string* | Name of the category group this category belongs to | NO | NO

Property `type` shows if the booking category is default in its group. It can be set as `NON_OPTIONAL` (default) or `CUSTOM`. Each group can only have one `NON_OPTIONAL` (default) category at a time.


### Query Parameters

Name | Type | Description
--- | --- | ---
sort | *string* | Sort by field. Prefix with `-` for descending. Valid fields: `name`, `type`, `gridColor`. Invalid values return 400.
page | *integer* | Pagination page number (offset = limit × page)
limit | *integer* | Number of results per page. Default: `20`, maximum: `1000`. Values above 1000 return 400.

### Extension Gating

Without the **"Booking Category Groups"** extension, only categories from the default (`NON_OPTIONAL`) group are returned. With the extension active, categories from all groups are returned.

## Search Booking Categories

```
POST /categories/search
```

Use this endpoint to search booking categories. It allows more complex filtering.

The body can be as follows:
```
{
	"type": "NON_OPTIONAL",
	"name": { "$like": "Video" }
}
```

### Search Parameters
Use parameters to narrow your search. You can send exact values or use the operators below.

Parameters | Description
--- | ---
$in | values included in array
$nin | values excluded from array
$like | includes (also partial) string match

### Searchable Properties
Property | Parameters | Type
--- | --- | ---
_id | $in, $nin | *ID*
name | $in, $nin, $like | *string*
type | $in, $nin | *string*
gridColor | $in, $nin | *string*
group | | *ID*

The `group` filter accepts a single category group ID. When provided, only categories belonging to that group are returned. Note: the `group` filter is ignored if `_id` is also supplied in the same request.

Without the **"Booking Category Groups"** extension, only categories from the default group are returned regardless of the search query.

## Get a Booking Category by ID

```
GET /categories/{{CATEGORY_ID}}
```

Use this endpoint to get a specific booking category by id.

A successful request will return a 200 Ok response status from the server.


## Create a Booking Category

```
POST /categories
```

Create a new booking category inside an existing group. In the body you must send the ID of the group to add the new booking category to.

A successful create operation will return a 201 OK response status from the server.

### Request Body

Property | Type | Description | Required
--- | --- | --- | ---
groupId | *string* | ID of the category group to add this category to | YES
name | *string* | Category name (non-empty) | YES
gridColor | *string* | Hex color code (`#888` or `#888888` format) | YES
type | *string* | `NON_OPTIONAL` or `CUSTOM` | YES

```
{
	"groupId": "5e62e12027a3df671be4582b",
	"name": "New Category",
	"gridColor": "#131215",
	"type": "NON_OPTIONAL"
}
```

Setting `type` to `NON_OPTIONAL` makes this category the default in its group. If another category in the group is currently the default, it will be automatically demoted to `CUSTOM` — each group can only have one default category at a time.

Without the **"Booking Category Groups"** extension, you can only create categories in the default (`NON_OPTIONAL`) group. Attempting to create in a `CUSTOM` group returns 400 `EXTENSION_IS_NOT_ACTIVE`.

## Update an Existing Booking Category

```
PUT /categories/{{CATEGORY_ID}}
```

Update a booking category's name, color, and type.

A successful update will return a 200 Ok response status from the server.

### Request Body

Property | Type | Description | Required
--- | --- | --- | ---
name | *string* | Category name (non-empty) | YES
gridColor | *string* | Hex color code (`#888` or `#888888` format) | YES
type | *string* | `NON_OPTIONAL` or `CUSTOM` | YES

```
{
    "name": "Video Shooting Category",
    "gridColor": "#C81930",
    "type": "CUSTOM"
}
```

#### Type Change Restrictions

- Changing `type` to `NON_OPTIONAL` is allowed. The group's current default category will be automatically demoted to `CUSTOM`.
- Changing `type` from `NON_OPTIONAL` to `CUSTOM` is **not** allowed and returns 400 `CATEGORY_DEFAULT_CHANGE_DENIED`. To demote a default category, promote a different category in the same group to `NON_OPTIONAL` instead — this automatically demotes the current default.

## Delete a Booking Category

```
DELETE /categories/{{CATEGORY_ID}}
```

Delete a specific booking category by id.

A successful delete will return a 204 Ok response status from the server.

You are not allowed to delete the default (`type = "NON_OPTIONAL"`) category. Attempting to do so returns 400 `ENTITY_DELETION_NOT_ALLOWED`. First set a different category as the default by updating another category's `type` to `NON_OPTIONAL`, then delete the original.

Without the **"Booking Category Groups"** extension, you can only delete categories in the default (`NON_OPTIONAL`) group. Attempting to delete a category in a `CUSTOM` group returns 400 `EXTENSION_IS_NOT_ACTIVE`.

## Category Groups

Category groups organize booking categories. Each company has one default (`NON_OPTIONAL`) group that cannot be deleted. Additional `CUSTOM` groups require the **"Booking Category Groups"** extension.

### Category Group Properties

The following is a description of the properties in the response.

Property | Type | Description | Required | Sortable
--- | --- | --- | --- | ---
_id | *string* | id of the Category Group | NO | NO
name | *string* | Group Name | NO | YES
createdDate | *string* | Group Creation Date | NO | NO
updatedDate | *string* | Group Updated Date | NO | NO
type | *string* | `NON_OPTIONAL` (default) or `CUSTOM` | NO | YES
categories | *array* | Array of booking category IDs belonging to this group | NO | NO

### Get All Category Groups

```
GET /category-groups
```

The call will return an array of category groups for your company.

Server Response example below.

```
[
  {
      "_id": "5e665eee6e832f54bf8ed86d",
      "name": "Category Group",
      "createdDate": "2020-03-09T15:21:18.378Z",
      "updatedDate": "2020-03-09T15:21:18.378Z",
      "type": "NON_OPTIONAL",
      "categories": [
          "5d5d1922f84b6cc67c818531",
          "5d72338047cc372f3df535a2",
          "5d7795a0f840c447783599f2",
          "5e2ff31767574009760d1502"
      ]
  }
]
```

Without the **"Booking Category Groups"** extension, only the default (`NON_OPTIONAL`) group is returned. With the extension active, all groups are returned.

#### Query Parameters

Name | Type | Description
--- | --- | ---
sort | *string* | Sort by field. Prefix with `-` for descending. Valid fields: `name`, `type`. Invalid values return 400.
page | *integer* | Pagination page number
limit | *integer* | Number of results per page. Default: `20`, maximum: `1000`.

### Search Category Groups

```
POST /category-groups/search
```

Use this endpoint to search category groups. It allows more complex filtering.

#### Search Parameters

Parameters | Description
--- | ---
$in | values included in array
$nin | values excluded from array

#### Searchable Properties

Property | Parameters | Type
--- | --- | ---
_id | $in, $nin | *ID*
name | $in, $nin | *string*
type | $in, $nin | *string*

The `categories` property in the response holds all booking category IDs belonging to the group.

Same extension gating applies — without the extension, only the default group is returned.

### Get a Category Group by ID

```
GET /category-groups/{{CATEGORY_GROUP_ID}}
```

Use this endpoint to get a specific category group by id.

A successful request will return a 200 Ok response status from the server.

### Create a Category Group

```
POST /category-groups
```

Create a new category group. During creation, a default *General* category is automatically created for the group.

A successful create operation will return a 201 OK response status from the server.

#### Request Body

Property | Type | Description | Required
--- | --- | --- | ---
name | *string* | Group name (non-empty) | YES
projectIds | *array* | Array of project IDs to associate the new group with | NO

```
{
    "name": "Development Team",
    "projectIds": ["5e62e12027a3df671be4582b"]
}
```

All groups created through the API are `CUSTOM` type.

Requires the **"Booking Category Groups"** extension. Without it, returns 403 `EXTENSION_IS_NOT_ACTIVE`.

### Update an Existing Category Group

```
PUT /category-groups/{{CATEGORY_GROUP_ID}}
```

Update a category group's name.

A successful update will return a 200 Ok response status from the server.

#### Request Body

Property | Type | Description | Required
--- | --- | --- | ---
name | *string* | Group name (non-empty) | YES

```
{
    "name": "Updated Group Name"
}
```

The default (`NON_OPTIONAL`) group can always be updated. For `CUSTOM` groups, the **"Booking Category Groups"** extension must be active, otherwise returns 403 `EXTENSION_IS_NOT_ACTIVE`.

### Delete a Category Group

```
DELETE /category-groups/{{CATEGORY_GROUP_ID}}
```

Delete a specific category group by id.

A successful delete will return a 204 Ok response status from the server.

You are not allowed to delete the default (`type = "NON_OPTIONAL"`) group. Attempting to do so returns 400 `ENTITY_DELETION_NOT_ALLOWED`.

Deleting a category group will also delete all booking categories within it and remove it from any associated projects.

For `CUSTOM` groups, the **"Booking Category Groups"** extension must be active, otherwise returns 403 `EXTENSION_IS_NOT_ACTIVE`.
