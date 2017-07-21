## Get All Resources

```
GET /resource
```

call will return all resources.

Server Response example below for 1 resource returned within an array. 

```
[{
  "_id": "547832df25044c9b060f9a5e",
  "email": "unique@email.com",
  "metadata": "",
  "createdDate": "2017-06-28T08:31:27.035Z",
  "updatedDate": "2017-06-28T08:31:27.039Z",
  "note": "",
  "firstName": "Paddy",
  "lastName": "DMan",
  "isProjectManager": false,
  "status": "STATUS_ACTIVE",
  "role": "ROLE_TEAM",
  "links": {
    "link5": "",
    "link4": "",
    "link3": "",
    "link2": "",
    "link1": ""
  },
  "billing": {
    "useDefault": false,
    "id": 123456789
    "rate": 100
  },
  "useCustomAvailability": false,
  "customAvailabilities": {
    "_id": "547845a7406ca4620b3a1356",
    "weekDays": {
      "sunday": {
        "minutes": 0,
        "workDay": false
      },
      "saturday": {
        "minutes": 0,
        "workDay": false
      },
      "friday": {
        "minutes": 480,
        "workDay": true
      },
      "thursday": {
        "minutes": 480,
        "workDay": true
      },
      "wednesday": {
        "minutes": 480,
        "workDay": true
      },
      "tuesday": {
        "minutes": 240,
        "workDay": true
      },
      "monday": {
        "minutes": 480,
        "workDay": true
      }
    }
  },
  "customFields": []
}]
```
The following is a description of the properties in the response.

Property | Type | Description | Required
--- | --- | --- | ---
_id | *string* | id of the Resource | NO
email | *string* | Resource Email (Unique) | NO
metadata | *string* | Custom Field (255 Characters) | NO
createdDate | *string* | Resource Creation Date | NO
updatedDate | *string* | Resource Updated Date | NO
note | *string* | Resource Notes | NO
firstName | *string* | Resource First Name | *YES*
lastName | *string* | Resource Last Name | NO
status | *string* | Resource Status | NO
role | *string* | Resource Role | NO
links | *object* |Resource Links | NO
billing | *object* | Resource Billing Options | NO
useCustomAvailability | *boolean* | Using Default Availability | NO
customAvailabilities | *object* | Define Custom Availability | NO
customFields | *object array* | Custom Fields, read Custom Fields section to see how to set them | NO

##### Custom Fields

You can fetch custom field templates defined for your account using:

```
GET /resource/customField/template
```

Those templates can be used to fill in corresponding fields in your resource. The sample answer for template list looks as follows(with only single template
in an array):

```
{
        "_id": 1234567890,
        "filterGrid": true,
        "deleted": false,
        "company": 1234567890,
        "label": "select field example",
        "instructions": "",
        "defaultValue": "",
        "defaultRadioId": "",
        "placeholderText": "",
        "createdDate": "2017-07-18T09:02:53.016Z",
        "choices": [
            {
                "value": "first choice",
                "_id": 1234567890
            },
            {
                "value": "second choice",
                "_id": 1234567890
            },
            {
                "value": "third choice",
                "_id": 1234567890
            }
        ],
        "canResourceEdit": false,
        "type": "SELECT",
        "category": "PROJECT",
        "status": "ACTIVE",
        "__v": 8,
        "allowMultipleValues": false,
        "characterLimit": 0,
        "maxValue": 0,
        "minValue": 0,
        "order": 5,
        "stepValue": 0,
        "updatedDate": "2017-07-18T09:04:22.152Z",
        "weekStartOn": 1
    }
```

Property | Type | Description
--- | --- | ---
_id | *string* | ID
filterGrid | *boolean* | ?
company | *string* | Id of company this belongs to. Always will be your company.
label | *string* | Name of custom field, set by company admin
instructions | *string* | Instructions how to use custom field, set by company admin
defaultValue | *string* | Default value, if any. Used only by fields without choices
defaultRadioId | *string* | Id of default value for radio button
placeholderText | *string* | Placeholder text for frontend forms
createdDate | *date* | Date of creation
choices | *objects* | Array of choices selectable by users
canResourceEdit | *boolean* | Whenever regular resources can edit this field
type | *enum* | Type of field, one of TEXT, TEXTAREA, EMAIL, DATE, COLOR, NUMBER, CHECKBOX, SELECT, RADIO
category | *enum* | Whenever this is project or resource custom field. Always will be RESOURCE for this endpoint
status | *enum* | Status of the custom field
allowMultipleValues | *boolean* | For select fields, whenever multiple values should be possible to be chosen at once
characterLimit | *number* | For number of text fields, limit of characters
maxValue | *number* | Max value for number fields
minValue | *number* | Min value for number fields
stepValue | *number* | For number fields step between possible values.
updatedDate | *date* | Date the field was last updated
weekStartOn | *number* | Number of day week starts on, starting with 0 as Sunday, 1 Monday. User by date field

Items in choices array have following properties:

Property | Type | Description
--- | --- | ---
_id | *string* | ID
value | *string* | Choice value

There are two different templates for custom fields, one that has a single property (string) value and one that allows for multiple linkable values stored in choices array. The templateType property will dictate which template is being used.

To set simple values choose templateId to use, pass in proper templateType and value you want to set, for example:

```
{ templateId:"55100b09640c63d006c673b2",
_id: "5626541945f2d486dd0b7106",
templateType: "TEXT | TEXTAREA | EMAIL | DATE | COLOR | NUMBER",
templateLabel: "Other information",
value: "Can make a mean chili" }
```

The value will be validated based on it's type. Min length, max length has to be kept as given. Email field can only contain properly validated e-mail.
Date needs to be in `YYYY-MM-DD` format. Color needs to use html hex codes(for example `#fff000` or `#fff`).

For choice fields you need to set templateId and an array of choices, where each choice needs to have proper choiceId. For example:

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

##### Status

The following table defines the different resource status available

Status | Description
--- | ---
STATUS_ACTIVE | Active Resources
STATUS_ARCHIVED | Archived Resources
STATUS_NON_BOOKABLE | Non Bookable Resource

##### Billing

You can set custom billing rate for your resource by giving the id of billing rate used in your company. If you put 'null' as `billing.id` the company
default billing will be used for this resource. You can read more on billing rate management under [billing rates](https://github.com/hubplanner/API/blob/master/Sections/billingrate.md).

```
{
    billing: {
        useDefault: false,
        id: 123456789,
        rate: 80
    }
}
```

`useDefault` and `rate` fields will be automatically set to what is set in chosen billing rate.

## Search Resources
```
POST resource/search
```
If you only want a certain status of resource such as `STATUS_ACTIVE`. 

```
{"status" : "STATUS_ACTIVE" }
```
will return all resources which are NOT `STATUS_ACTIVE`
```
{"status" : {"$nin": "STATUS_ACTIVE" } }
```
will return all resources which are `STATUS_ACTIVE` and `STATUS_ARCHIVED`
```
{"status" : {"$in": ["STATUS_ACTIVE", "STATUS_ARCHIVED"] } }
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
DELETE /resource/12345678
```
Will delete resource with the id `12345678`

A successful delete will return a `200` Ok response status from the server.
