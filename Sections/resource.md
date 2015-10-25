## Get All Resources

```
GET /resource
```

call will return all resources.

Server Response example below for 1 resource returned within an array. 

```
[{ _id: '547832df25044c9b060f9a5e',
  email: 'unique@email.com',
  metadata: '',
  createdDate: '2014-11-28T08:31:27.035Z',
  updatedDate: '2014-11-28T08:31:27.039Z',
  note: '',
  firstName: 'Paddy',
  lastName: 'DMan',
  status: 'STATUS_ACTIVE',
  role: 'ROLE_TEAM',
  links: { link5: '', link4: '', link3: '', link2: '', link1: '' },
  billing: { useDefault: true, rate: 0 },
  useCustomAvailability: false,
  customAvailabilities: { _id: '547845a7406ca4620b3a1356',
    weekDays:
     { sunday: { minutes: 0, workDay: false },
       saturday: { minutes: 0, workDay: false },
       friday: { minutes: 480, workDay: true },
       thursday: { minutes: 480, workDay: true },
       wednesday: { minutes: 480, workDay: true },
       tuesday: { minutes: 240, workDay: true },
       monday: { minutes: 480, workDay: true }} 
   },
    customFields: []
}]
```
The following is a description of the properties in the response.

Property | Type | Description
--- | --- | ---
_id | *string* | id of the Resource
email | *string* | Resource Email (Unique)
metadata | *string* | Custom Field (255 Characters)
createdDate | *string* | Resource Creation Date
updatedDate | *string* | Resource Updated Date
note | *string* | Resource Notes
firstName | *string* | Resource First Name
lastName | *string* | Resource Last Name
status | *string* | Resource Status
role | *string* | Resource Role
links | *object* |Resource Links
billing | *object* | Resource Billing Options
useCustomAvailability | *boolean* | Using Default Availability
customAvailabilities | *object* | Define Custom Availability
customFields | *object array* | Custom Fields* (read only)

##### Custom Fields 

There are two different templates for custom fields, one that has a single property (string) value and one that allows for multiple linkable values. The templateType property will dictate which template is being used.  

```
{ templateId:"55100b09640c63d006c673b2",
_id: "5626541945f2d486dd0b7106",
templateType: "TEXT | TEXTAREA | EMAIL | DATE | COLOR | NUMBER",
templateLabel: "Other information",
value: "Can make a mean chili" }
```
```
{ templateId:"55100b09640c63d006c673b2",
_id: "5626541945f2d486dd0b7106",
templateType: "CHECKBOX | RADIO | SELECT",
templateLabel: "Skills",
"choices": [
    {
        "value": "JAVA",
        "choiceId": "560a9a1cf0168116192eccf5",
        "_id": "5626541945f2d486dd0b7105"
    },
    {
        "value": "C++",
        "choiceId": "560a9a1ea5a77611195a3ee1",
        "_id": "5626541945f2d486dd0b7104"
    }
] }
```
Property | Type | Description
--- | --- | ---
_id | *string* | ID
templateId | *string* | Refference ID @customFieldTemplate._id
templateType | *string* | The type of custom field
templateLabel | *string* | Label for the custom field (showing on custom fields tab) 
value | *string* | The user inputed value for the custom field if type allows for text input
choices | *array* | Array of selected choices (options that are not selected will not be present)
choices.value | *string* | Value 
choices.choiceId | *string* | Refference ID @customFieldTemplate.choices._id
choices._id | *string* | ID

##### Status

The following table defines the different resource status available

Status | Description
--- | ---
STATUS_ACTIVE | Active Resources
STATUS_ARCHIVED | Archived Resources
STATUS_NON_BOOKABLE | Non Bookable Resource


## Search Resources
```
POST resource/search
```
If you only want a certain status of resource such as `STATUS_ACTIVE`. 

```
{"status" : "STATUS_ACTIVE" }
```
will return all projects which are NOT `STATUS_ACTIVE`
```
{"status" : {"$nin": "STATUS_ACTIVE" } }
```
will return all projects which are `STATUS_ACTIVE` and `STATUS_ARCHIVED`
```
{"name" : {"$in": ["STATUS_ACTIVE", "STATUS_ARCHIVED"] } }
```

### Search Parameters
Use paramters to narrow you search. For example use `$nin` for not included, and use `$in` for included.

Property | Parameters
--- | --- | ---
$nin | not included
$in | included

### Searchable Properties
Property | Parameters | Description
--- | --- | ---
_id | $nin, $in | resource id
metadata | $nin, $in | custom meta data field
firstName | $nin, $in | resource first name
lastName | $nin, $in | resource last name
status | $nin, $in | resource status
role | $nin, $in | resource role
email | $nin, $in | resource email

A successful search will return a `200` Ok response status from the server.

## Get Specific Resource
Use the following command to get a specific resource by `id`.
```
GET /resource/12345678
```
Will return resource with the id `12345678`

A successful resource will return a `200` Ok response status from the server.

## Create a Resource
Create a new resource.
```
POST /resource
```
An example of a Resource

```
{
    "firstName":"Paddy",
    "lastName":"DMan",
    "email":"unique@email.com"				   
}
```
The server will return the full resource object once created including the newly created resource ID `_id`

A successful create will return a `201` Ok response status from the server.

## Update a Resource
Update an existing resource.
```
PUT /resource/123456789
```
will update the resource with the id 123456789. You must pass in the entire resource object in the body when updating so no values will be overwritten to default. Best practice will be to read first and then merge.  

A successful update will return a `200` Ok response status from the server.

## Delete a Resource
Use the following command to delete a specific resource by `id`.
```
DEL /resource/12345678
```
Will delete resource with the id `12345678`

A successful delete will return a `200` Ok response status from the server.
