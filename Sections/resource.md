## Get All Resources

```
GET /resource
```

call will return all resources.

Server Response example below for 1 resource returned within an array. 

```
[{
    "_id": "5ba09b635ff58f149a2cf4e7",
    "email": "wojciech.bator@hubplanner.com",
    "metadata": "",
    "createdDate": "2018-09-18T06:24:25.297Z",
    "updatedDate": null,
    "note": "",
    "firstName": "First Name",
    "lastName": "Last Name",
    "status": "STATUS_ACTIVE",
    "role": "ROLE_OWNER",
    "isProjectManager": false,
    "links": {
        "iconLink5": "fa-link",
        "link5": "",
        "iconLink4": "fa-link",
        "link4": "",
        "iconLink3": "fa-link",
        "link3": "",
        "iconLink2": "fa-link",
        "link2": "",
        "iconLink1": "fa-link",
        "link1": ""
    },
    "billing": {
        "useDefault": false,
        "id": null,
        "rate": 0
    },
    "customFields": [],
    "useCustomAvailability": false,
    "resourceRates": {
      "external": [{
          "defaultRateId": "5ba09b645ff58f1455552222",
          "effectiveFrom": "2018-09-20 09:00",
          "effectiveTo": "2018-10-30 18:00"
      }],
      "internal": [{
          "defaultRateId": "5ba09b645ff58f1455552223",
          "effectiveFrom": "2018-09-20 09:00",
          "effectiveTo": "2018-10-30 18:00"
      }]
    }
}]
```
The following is a description of the properties in the response.

Property | Type | Description | Required | Sortable
--- | --- | --- | --- | ---
_id | *string* | id of the Resource | NO | NO
email | *string* | Resource Email (Unique) | NO | YES
metadata | *string* | Custom Field (255 Characters) | NO | YES
createdDate | *string* | Resource Creation Date | NO | YES
updatedDate | *string* | Resource Updated Date | NO | YES
note | *string* | Resource Notes | NO | NO
firstName | *string* | Resource First Name | *YES* | YES
lastName | *string* | Resource Last Name | NO | YES
status | *string* | Resource Status | NO | YES
role | *string* | Resource Role | NO | YES
links | *object* |Resource Links | NO | NO
billing | *object* | Resource Billing Options | NO, deprecated, use `resourceRates` instead | NO
useCustomAvailability | *boolean* | Using Default Availability | NO | NO
customFields | *object array* | Custom Fields, read Custom Fields section to see how to set them | NO | NO
resourceRates | *object* | Reference to billing rates for the resource | NO | NO

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

#### Creating a Resource with Custom Field Value

To set simple values choose templateId to use, pass in proper templateType and value you want to set, for example:

```

{
    "firstName":"First Name",
    "lastName":"Last Name",
    "email":"unique2@email.com",
    "customFields": [
    	{ 
    		"templateId":"5e54db0041e7270c38b248f8",
			"templateType": "TEXT", // set the filed TEXT | TEXTAREA | EMAIL | DATE | COLOR | NUMBER
			"value": "Hub Planner 567876534" 
		}
		]
}

```

The value will be validated based on it's type. Min length, max length has to be kept as given. Email field can only contain properly validated e-mail. Date needs to be in `YYYY-MM-DD` format. Color needs to use html hex codes(for example `#fff000` or `#fff`).

#### Creating a Resource with Custom Field Choice
For choice fields you need to set templateId and an array of choices which is the `_id` field when you GET the Custom Field Templates.  

```
{
    "firstName":"First Name",
    "lastName":"Last Name",
    "email":"unique22@email.com",
    "customFields": [
        {
            "templateId":"57a385803754451a08de2da7", // _id field in template from GET.
            "templateType": "CHECKBOX",
            "choices": [
                {
                    "value": "Photoshop",
                    "choiceId": "5c9e2bc10e378fa97db8509d" // _id field in template from GET.
                },
                {
                    "value": "Illustrator",
                    "choiceId": "5c9e2bc10e378fa97db85092" // _id field in template from GET.
                }
            ]
        }
    ]
}
```

##### Status

The following table defines the different resource status available

Status | Description
--- | ---
STATUS_ACTIVE | Active Resources
STATUS_ARCHIVED | Archived Resources
STATUS_NON_BOOKABLE | Non Bookable Resource
STATUS_PARKED | Parked Resource

##### Billing rates

The recommended way to set custom billing rate for the resource is by using `resourceRates` field. The `resourceRates` is structured as follows:

```
"resourceRates": {
  "external": [{
      "defaultRateId": "5ba09b645ff58f1455552222",
      "effectiveFrom": "2018-09-20 09:00",
      "effectiveTo": "2018-10-30 18:00"
  }],
  "internal": [{
      "defaultRateId": "5ba09b645ff58f1455552223",
      "effectiveFrom": "2018-09-20 09:00",
      "effectiveTo": "2018-10-30 18:00"
  }]
}
```

Rates are split to internal rates and external rates. You need to have billing rates extension enabled to use internal rates. You can provide the id of billing rate used in your company for `defaultRateId` fields. The `effectiveFrom` and `effectiveTo` fields specifies the date ranges when the rate is effective.

There is also deprecated way to set the resource rates. You can set custom billing rate for your resource by giving the id of billing rate used in your company. If you put 'null' as `billing.id` the company
default billing will be used for this resource. 

```
{
    billing: {
        useDefault: false,
        id: 123456789,
        rate: 80
    }
}
```

`useDefault` and `rate` fields will be automatically set to what is set in chosen billing rate. Note, that using the legacy approach is compatible with `resourceRates` and will create `external` part of it. You can read more on billing rate management under [billing rates](https://github.com/hubplanner/API/blob/master/Sections/billingrate.md).

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
--- | ---
$nin | not included
$in | included
$like | includes (also partial) string

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
customFieldsTemplateId | $nin, $in | custom fields template id
customFieldsTemplateLabel | $nin, $in, $like | custom fields template label
customFieldsTemplateType | $nin, $in | custom fields template type
customFieldsValue | $nin, $in, $like | custom fields value
customFieldsChoiceId | $nin, $in | custom fields template choice id

A successful search will return a `200` Ok response status from the server.

## Search Custom Fields
```
POST project/customField/template/search
```
If you only want a certain type of custom fields such as `CHECKBOX`.
```
{"type" : "CHECKBOX" }
```
will return all custom fields which are NOT `CHECKBOX`
```
{"type" : {"$nin": ["CHECKBOX"] } }
```
will return all custom fields which are `CHECKBOX` and `TEXT`
```
{"type" : {"$in": ["CHECKBOX", "TEXT"] } }
```
will return all custom fields which includes `Policy` in label
```
{"label" : {"$like": "Policy" } }
```
will return all required custom fields
```
{"isRequired" : true }
```

### Custom Fields Search Parameters
Use paramters to narrow you search. For example use `$nin` for not included, and use `$in` for included.

Property | Parameters
--- | ---
$nin | not included
$in | included
$like | includes (also partial) string

### Searchable Properties
Property | Parameters | Description
--- |------------------| ---
label | $nin, $in, $like | custom fields template label
type | $nin, $in | custom fields template type
isRequired | - | is required flag
choiceId | $nin, $in | custom fields template choice id

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

###### Mandatory Custom Fields

*IMPORTANT*: If any of Resource Custom Fields is set to mandatory, it will be validated only, if `customFields` property will be present in payload.

### Automatically Invite User when Added

`sendInviteEmail` property added to payload, will automatically invite User when added, sending invitation email. Example:

```
{
    "firstName":"Paddy",
    "lastName":"DMan",
    "email":"unique@email.com",
    "sendInviteEmail": true				   
}
```

*IMPORTANT*: `email` property must be filled in with valid email, not used by other resource. 

## Create Multiple Resources
Create multiple resources.
```
POST /resource
```
Pass in an array in the body

```
[{"firstName": "Resource 1"}, {"firstName": "Resource 2"}]
```

## Update Single Resource

You can easily update a resource by passing the `_id` of the resource and the property you would like to update. You must pass the resource object inside an array `[]` for it to validate using the `PATCH` method. 

	PATCH {{API_URL}}/resource

example `body`, update resource with `_id: 5f02d81cf959470bfda820b0` 

    [  
		{  
			"_id": "5f02d81cf959470bfda820b0",  
			"lastName": "Green",  
			"note": "Hub Planner"  
		}
	]

###### Mandatory Custom Fields

*IMPORTANT*: If any of Resource Custom Fields is set to mandatory, it will be validated only, if `customFields` property will be present in payload.

## Bulk Update Resources

Similar to above example you just need to pass in multiple objects in the array `[]` to bulk update multiple resources.

	PATCH {{API_URL}}/resource
	
example `body`, update 2 resources  

    [  
		{  
			"_id": "5f02d81cf959470bfda820b0",  
			"lastName": "Green",  
			"note": "Hub Planner"  
		},  
		{  
			"_id": "5ce678c066df572dae543b93",  
			"firstName": "Anna"  
		}  
	]

## Delete a Resource
Use the following command to delete a specific resource by `id`.
```
DELETE /resource/12345678
```
Will delete resource with the id `12345678`

A successful delete will return a `200` Ok response status from the server.

## Delete multiple resources
Use the following command to delete multiple resources by their `id` fields.
```
DELETE /resource
```
Provide the array of ids in the request body. An example:
```
[
    "5ae1d7a2d61e560c4936aaaa",
    "5ae1d7a2d61e560c4936bbbb",
    "5ae1d7a2d61e560c4936cccc"
]
```

A successful delete will return a `200` Ok response status from the server and an array of removed resource ids.

## Resource Tags

### Get all Resource Tags
Use the following command to get a list of resource tags.
```
GET /resource/12345678/tag
```
Will return all tags that resource `12345678` has. An example response is as follows:
```
[
    {
        "tagId": "5bb1e49065e0555544443333",
        "value": "scala",
        "_id": "5bbcaa1ae9fcfa1a87cd5f0e"
    }
]
```

A successful operation will return a `200` Ok response status from the server.

### Add new Resource Tag
Use the following command to add a new resource tag to resource.
```
PATCH /resource/12345678/tag
```
Will add the tag with id `56789` to resource `12345678`.

This operation works as adding to set, meaning that it preserves already existing tags and appends only new ones added in request body.

The request body is as follows:
```
{
    "tags": ["5bb1e49065e03b5388887777", "5bb1e49065e03b5388887778"]
}
```

A successful operation will return a `200` Ok response status from the server and resource updated with new tags.

### Remove Resource Tag from Resource
Use the following command to remove the resource tag from resource.
```
DELETE /resource/12345678/tag/222333
```
Will remove the tag with id `222333` from resource `12345678`.

A successful operation will return a `204` No content response status from the server.
