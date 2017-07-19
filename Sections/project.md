## Get All Projects

```
GET /project
```

call will return all projects.

Server Response example below for 1 project returned within an array. 

```
[{  _id: '53a168304cc0f1bb16a898ca',
    name: '788',
    links: { link1: '', link2: '', link3: '', link4: '', link5: '' },
    note: '',
    createdDate: '2014-06-18T10:21:36.917Z',
    updatedDate: '2014-07-24T06:23:21.921Z',
    workDays: [ false, true, true, true, true, true, false ],
    useProjectDays: false,
    budget:
     { hasBudget: false,
       projectHours: { active: false, hours: 0 },
      cashAmount: { 
          active: false,
          amount: 0,
          billingRate: { useDefault: true, rate: 0 } 
        } 
      },
    useStatusColor: true,
    status: 'STATUS_ACTIVE',
    useProjectDuration: false,
    start: null,
    end: null,
    backgroundColor: '#81A489',
    projectCode: 'AA',
    metadata: '',
    customFields: [],
    timeEntryNoteRequired: true,
    resourceRates: [
        {
            _id: 1234567890,
            resource: 1234567890,
            companyBillingRateId: 1234567890,
            companyBillingRate: 100
        }
     ],
}]
```

Property | Type | Description
--- | --- | ---
_id | *string* | id of the project
name | *string* | Project name
links | *object* |Project Links
note | *string* | Project Notes
createdDate | *string* | Project Creation Date
updatedDate | *string* | Project Updated Date
workDays | *boolean* | Object of work days for a week
useProjectDays | *boolean* | If using default days or custom.
budget | *object* | An object containing budget properites. 
useStatusColor | *boolean* | If using the default status color or not
status | *string* | Project Status (Active, Archived, Pending, Planned, Floating)
useProjectDuration | *boolean* | Display Project Start and End Display Dates
start | *string* |('YYYY-MM-DD') Project Start Display Date
end |*string* |('YYYY-MM-DD') Project End Display Date
backgroundColor |*string* | Project  Color
projectCode |*string* | Project Code (Unique)
metadata | *string* | Custom Field (255 Characters)
customFields | *object array* | Custom Fields, read Custom Fields section to see how to set them
timeEntryNoteRequired | *boolean* | Require Note on Time Entries

##### Custom Fields

You can fetch custom field templates defined for your account using:

```
GET /project/customField/template
```

Those templates can be used to fill in corresponding fields in your project. The sample answer for template list looks as follows(with only single template
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
choices | *objects array* | Array of choices selectable by users
canResourceEdit | *boolean* | Whenever regular resources can edit this field
type | *enum* | Type of field, one of TEXT, TEXTAREA, EMAIL, DATE, COLOR, NUMBER, CHECKBOX, SELECT, RADIO
category | *enum* | Whenever this is project or resource custom field. Always will be PROJECT for this endpoint
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

##### Billing

You can set custom billing rate for your project by giving the id of billing rate used in your company. If you put 'null' as `billing.id` the company
default billing will be used for this resource. You can read more on billing rate management under [billing rates](https://github.com/hubplanner/API/blob/master/Sections/billingrate.md).

```
budget: {
    cashAmount: {
        billingRate: {
            useDefault: false,
            id: 123456789,
            rate: 80
        }
     }
},
```

`useDefault` and `rate` fields will be automatically set to what is set in chosen billing rate.

You can also set custom billing rates for resources. To do that change resourceRates array in project object.

```
    "resourceRates": [
        {
            "resource": "596397771a488107aafc1db6",
            "companyBillingRateId": "596397761a488107aafc1da2",
            "companyBillingRate": 100
        }
    ],
```

In the response you will get automatically generated `_id` of custom resource rate, which you should keep in update calls.
Both resource id and billing rate id must exist in system. Billing rate is assigned automatically from the billing rate.

## Search Projects
```
POST project/search
```
If you only want a certain status of project such as `STATUS_ACTIVE`. 

```
{"status" : "STATUS_ACTIVE" }
```
will return all projects which are NOT `STATUS_ACTIVE`
```
{"status" : {"$nin": ["STATUS_ACTIVE"] } }
```
will return all projects which are `STATUS_ACTIVE` and `STATUS_FLOATING`
```
{"name" : {"$in": ["STATUS_ACTIVE", "STATUS_FLOATING"] } }
```

### Search Parameters
Use paramters to narrow you search. For example use `$nin` for not included, and use `$in` for included.

Property | Parameters
--- | --- | ---
$nin | not included
$in | included
$lt | less than
$lte | less than or equal
$gte | greater than

### Searchable Properties
Property | Parameters | Description
--- | --- | ---
_id | $nin, $in | project id
metadata | $nin, $in | custom meta data field
name | $nin, $in | project name
projectCode | $nin, $in | project code
status | $nin, $in | project status
resources | $nin, $in | project resource id
start |$lt, $lte, $gte | project start
end | $lt, $lte, $gte | project end

A successful search will return a `200` Ok response status from the server.

## Get Specific Project
Use the following command to get a specific project by `id`.
```
GET /project/12345678
```
Will return project with the id `12345678`

A successful project will return a `200` Ok response status from the server.

## Create a Project
Create a new project.
```
POST /project
```
An example of a project

```
{"name": "My First Project"}
```
The server will retyrn the full project object once created including the newly created project ID `_id`

A successful create will return a `201` Ok response status from the server.

## Update a Project
Update an existing project.
```
PUT /project/123456789
```
will update the project with the id 123456789. You must pass in the entire project object in the body. 

A successful update will return a `200` Ok response status from the server.

Note: Budget rate is not supported to change / create through the API. Planned support in V2, Spring 2016

## Delete a Project
Use the following command to delete a specific project by `id`.
```
DELETE /project/12345678
```
Will delete project with the id `12345678`

A successful delete will return a `200` Ok response status from the server.

## Add a Resource to a Project
Add a Resource to a Project
```
POST project/addResourcesToProject/projectId
Accept: application/json
Content-Type: application/json

{"resourceIds":["654654365436543634","654365436543654365436"]}
```
Property | Type | Description
--- | --- | ---
projectId | string | Project ID e.g. 654654365436543634
resourceIds | array | Array of Resource ID's

A successful add will return a `200` Ok response status from the server.

## Remove a Resource from a Project
Remove a Resource from a Project
```
POST project/removeResourceFromProjects/resourceId
Accept: application/json
Content-Type: application/json

{"projectIds":["654654365436543634","654365436543654365436"]}
```
Property | Type | Description
--- | --- | ---
resourceId | string | Resource ID e.g. 654654365436543634
projectIds | array | Array of Project ID's

A successful remove will return a `200` Ok response status from the server.
