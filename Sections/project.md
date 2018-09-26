## Get All Projects

```
GET /project
```

call will return all projects.

Server Response example below for 1 project returned within an array. 

```
[{
    "_id": "5ba09b645ff58f149a2cf521",
    "name": "Test proj",
    "links": {
        "iconLink5": "",
        "link1": "",
        "iconLink4": "",
        "link2": "",
        "iconLink3": "",
        "link3": "",
        "iconLink2": "",
        "link4": "",
        "iconLink1": "",
        "link5": ""
    },
    "note": "",
    "createdDate": "2018-09-18T06:29:56.261Z",
    "updatedDate": "2018-09-25T07:45:51.825Z",
    "timeEntryEnabled": true,
    "timeEntryLocked": false,
    "timeEntryApproval": true,
    "projectCode": "",
    "timeEntryNoteRequired": false,
    "workDays": [
        false,
        true,
        true,
        true,
        true,
        true,
        false
    ],
    "useProjectDays": false,
    "budget": {
        "hasBudget": false,
        "projectHours": {
            "active": false,
            "hours": 0
        },
        "cashAmount": {
            "active": false,
            "amount": 0,
            "currency": "USD",
            "billingRate": {
                "useDefault": false,
                "rate": 0,
                "id": null
            }
        }
    },
    "budgetHours": 0,
    "budgetCashAmount": 0,
    "budgetCurrency": "USD",
    "companyBillingRateId": null,
    "useStatusColor": true,
    "status": "STATUS_ACTIVE",
    "useProjectDuration": false,
    "start": null,
    "end": null,
    "resourceRates": [],
    "includeBookedTimeReports": true,
    "includeBookedTimeGrid": true,
    "projectManagers": [
        "5ba09fc85ff58f149a2c2222"
    ],
    "resources": [
        "5ba09b645ff58f149a2c2222",
        "5ba09b645ff58f149a2c3333",
        "5ba09b645ff58f149a2c4444",
        "5ba09b635ff58f149a2c5555",
        "5ba09fc85ff58f149a2c6666",
        "5ba09fdb5ff58f149a2c7777",
        "5ba09fd05ff58f149a2c8888"
    ],
    "backgroundColor": "#81A489",
    "metadata": "",
    "customFields": [],
    "projectRate": {
        "external": {
            "defaultRateId": "5ba09b645ff58f1455552222"
            "customRates": [{
                "resourceId": "5ba09b645ff58f149a2c3333",
                "id": "5ba09b645ff58f1477773333"
            }]
        },
        "internal": {
            "defaultRateId": "5ba09b645ff58f1455552223"
            "customRates": [{
                "resourceId": "5ba09b645ff58f149a2c3333",
                "id": "5ba09b645ff58f1477773333"
            }]
        }
    }
}]
```

Property | Type | Description | Required | Sortable
--- | --- | --- | --- | ---
_id | *string* | id of the project | NO | NO
name | *string* | Project name | *YES* | YES
links | *object* |Project Links | NO | NO
note | *string* | Project Notes | NO | NO
createdDate | *string* | Project Creation Date | NO | YES
updatedDate | *string* | Project Updated Date | NO | YES
timeEntryEnabled | *boolean* | If time entry is enabled | NO | NO
timeEntryLocked | *boolean* | If time entry is locked | NO | NO
timeEntryApproval | *boolean* | If time entry approval is set | NO | NO
resourceRates | *object* | Reference to resource billing rates | NO | NO
includeBookedTimeReports | *boolean* | If to include booked time reports | NO | NO
includeBookedTimeGrid | *boolean* | If to include booked time grid | NO | NO
projectManagers | *string array* | Project managers of project | NO | NO
resources | *string array* | Resources in project | NO | NO
workDays | *boolean* | Object of work days for a week | NO | NO
useProjectDays | *boolean* | If using default days or custom. | NO | NO
budget | *object* | An object containing budget properites. | NO, deprecated, use `companyBillingRateId`, `budgetHours`, `budgetCashAmount` and `budgetCurrency` instead | NO
companyBillingRateId | *string* | Id of selected billing rate for project | NO | NO
budgetHours | number | Amount of hours budgeted for this project. 0 means the budget in hours is disabled for this project. | NO | YES
budgetCashAmount | number | Amount of money budgeted for this project, given in currency selected in `budgetCurrency`. 0 means that cash budget is disabled in this project. | NO | YES
budgetCurrency | number | Currency of money budgeted for this project | NO | YES
useStatusColor | *boolean* | If using the default status color or not | NO | NO
status | *string* | Project Status (Active, Archived, Pending, Planned, Floating) | NO, defaults to Active | YES | NO
useProjectDuration | *boolean* | Display Project Start and End Display Dates | NO | NO
start | *string* |('YYYY-MM-DD') Project Start Display Date | Only if `useProjectDuration` is set to true | YES | NO
end |*string* |('YYYY-MM-DD') Project End Display Date | Only if `useProjectDuration` is set to true | YES | NO
backgroundColor |*string* | Project  Color | NO | NO
projectCode |*string* | Project Code (Unique) | NO | NO
metadata | *string* | Custom Field (255 Characters) | NO | YES
customFields | *object array* | Custom Fields, read Custom Fields section to see how to set them | NO, but if you use them check Custom Fields section to see how to use them | NO
timeEntryNoteRequired | *boolean* | Require Note on Time Entries | NO | NO
projectRate | *object* | Reference to project billing rates | NO | NO

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

##### Billing rates

The recommended way to set custom billing rate for your project is by using `projectRate` field. The `projectRate` is structured as follows:

```
"projectRate": {
    "external": {
        "defaultRateId": "5ba09b645ff58f1455552222"
        "customRates": [{
            "resourceId": "5ba09b645ff58f149a2c3333",
            "id": "5ba09b645ff58f1477773333"
        }]
    },
    "internal": {
        "defaultRateId": "5ba09b645ff58f1455552223"
        "customRates": [{
            "resourceId": "5ba09b645ff58f149a2c3333",
            "id": "5ba09b645ff58f1477773333"
        }]
    }
}
```

Rates are split to internal rates and external rates. You can provide the id of billing rate used in your company for `defaultRateId` field. The `customRates` array allows to have custom billing rates for given resource. The `resourceId` field is the id of the resource and the `id` field is the id of the billing rate used for this resource. 

There is also deprecated way to set the rates. You can set the id of billing rate used in your company to the `companyBillingRateId` field as follows:

```
    companyBillingRateId: 1234567890,
```

You can also set custom billing rates for resources. To do that change resourceRates array in project object.

```
    "resourceRates": [
        {
            "resource": "596397771a488107aafc1db6",
            "companyBillingRateId": "596397761a488107aafc1da2"
        }
    ],
```

In the response you will get automatically generated `_id` of custom resource rate, which you should keep in update calls.
Both resource id and billing rate id must exist in system. Billing rate is assigned automatically from the billing rate. You can read more on billing rate management under [billing rates](https://github.com/hubplanner/API/blob/master/Sections/billingrate.md).

###### Legacy Billing

*IMPORTANT*: Following method to manage billing is DEPRECATED and will be disabled in upcoming updates. This method will work only if you use `budget` object and will overwrite
settings in new properties. It's suggested to start using new properties for dealing with billing. To do so don't add `budget` object to your requests.

You can set custom billing rate for your resource by giving the id of billing rate used in your company. If you put 'null' as `billing.id` the company
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

##### Budget

You can set budget settings by using following properties:

* Budget in hours: `budgetHours`
* Budget in cash: `budgetCashAmount`
* Budget currency: `budgetCurrency`

Sample below shows how to set budget for 200 hours and 8000 USD:

```
    budgetHours: 200,
    budgetCashAmount: 8000,
    budgetCurrency: "USD",
```

You can set budgetHours or budgetCashAmount to 0 to disable those budgets in your project.

###### Legacy budget

*IMPORTANT*: Following method to manage budget is DEPRECATED and will be disabled in upcoming updates. This method will work only if you use `budget` object and will overwrite
settings in new properties. It's suggested to start using new properties for dealing with budget. To do so don't add `budget` object to your requests.

You can set budget settings by using budget object in your request. You can set:

* Budget in hours: by setting `budget.projectHours.hours` to value you want.
* Budget in cash amount: by setting `budget.cashAmount.amount` to value you want.
* Budget currency: by setting `budget.cashAmount.currency` to one of available currencies - check this section [this section](https://github.com/hubplanner/API/blob/master/Sections/billingrate.md#currency) for more detail.

Sample below shows how to set budget for 200 hours and 8000 USD. All other values are ignored during update and will be recalculated and returned in the response.
```
"budget": {
            "hasBudget": false,
            "projectHours": {
                "active": false,
                "hours": 200
            },
            "cashAmount": {
                "active": false,
                "amount": 8000,
                "currency": "USD",
                "billingRate": {
                    "useDefault": false,
                    "rate": 0,
                    "id": null
                }
            }
        },
```

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
## Add Clients to a Project
Add Clients to a Project
```
POST projectId/client/
Accept: application/json
Content-Type: application/json

{"clientIds": ["654654365436543634","654365436543654365436"]}
```
Property | Type | Description
--- | --- | ---
projectId | string | Project ID e.g. 654654365436543634
clientIds | array | Array of Client ID's

A successful add will return a `200` Ok response status from the server.
## Remove a Client from Projects
Remove a Client from a Projects
```
POST project/client/clientId
Accept: application/json
Content-Type: application/json

{"projectIds": ["654654365436543634","654365436543654365436"]}
```
Property | Type | Description
--- | --- | ---
clientId | string | Resource ID e.g. 654654365436543634
projectIds | array | Array of Project ID's

A successful remove will return a `200` Ok response status from the server.

## Set Project Managers
Set Project Managers in a project. Project Managers Extension is required to use this method.
```
PUT project/projectId/project-managers
Accept: application/json
Content-Type: application/json

["654654365436543634","6543654365436543655"]
```
Property | Type | Description
--- | --- | ---
projectId | string | Project ID e.g. 654654365436543634
Body | array | Array of Project Manager ID's

A successful set will return a `200` Ok response status from the server along with updated project.