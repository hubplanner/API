## Get All Vacations

```
GET /vacation
```
A response from the server would be as follows:
```
[{
    "_id": "5b57026357617d1522a93f6a",
    "resource": "5b55c4dda9993e7e7d14c16d",
    "project": "5b55c4dda9993e7e7d14c153",
    "start": "2018-07-25T09:00:00.000Z",
    "end": "2018-07-26T18:00:00.000Z",
    "type": "APPROVED",
    "approvalInfo": {
        "approvers": [
            {
                "id": "5b55cd2e08d6f6069a94dcab",
                "_id": "5b5724b1ba95e739516deef9"
            },
            {
                "id": "5b55c4dda9993e7e7d14c169",
                "_id": "5b5724b1ba95e739516deef8"
            }
        ],
        "approverNote": "I agree",
        "requesterNote": "I request vacation for 2 days",
        "approvedOrRejectedById": "5b55cd2e08d6f6069a94dcab",
        "approvedOrRejectedDate": "2018-07-28T09:12:00.000Z"
    },
    "metadata": "",
    "resourceType": "REGULAR",
    "state": "PERCENTAGE",
    "minutesPerDay": 52.8,
    "creatorId": "5b55c4dda9993e7e7d14c16d",
    "percentAllocation": 11,
    "title": "Two day vacation request"
}]
```
The following is a description of the properties in the response.

Property | Type | Description | Required | Sortable
--- | --- | --- | --- | ---
_id | *string* | id of the vacation | NO | NO
title | *string* | Vacation Tile | NO | YES
start | *string* | Vacation start date (for hourly creation pass in hours, see below) | *YES* | YES
end | *string* | Vacation end date (for hourly creation pass in hours, see below) | *YES* | YES
minutesPerDay | *integer* | Vacation minutes per day amount - defaults to 480 (full day) | NO | NO
resource | *string* | Resource ID | *YES* | NO
state | *string* | Vacation State, defaults to 'PERCENTAGE' | NO | NO
approvalInfo | *object* | Vacation approval information | NO | NO
type | *string* | Vacation event type, for example 'APPROVED' or 'REJECTED' | NO | YES
resourceType | *string* | Resource type, for example 'REGULAR' | NO | YES
metadata | *string* | Custom Field | NO | YES
percentAllocation | *string* | Allocation of vacation in percents, defaults to 100 | NO | NO
creatorId | *string* | Id of event creator, defaults to API caller | NO | NO

## Search vacation
```
POST vacation/search
```
If you only want all vacation for a resource id `123`
```
{"resource":"123"}
```
If you only want all vacation for a project id `456`
```
{"project":"456"}
```
If you want to query all vacation for a date range:
```
{"start": {"$lt": "2018-08-15"}, "end":{"$gte": "2018-08-01"} }
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
_id | $nin, $in | vacation id
metadata | $nin, $in | custom meta data field
start | $lt, $lte, $gte | start date range
end | $lt, $lte, $gte | end date range
title | $nin, $in | vacation title
type | $nin, $in | vacation type
resource | $nin, $in | vacations per resource

A successful search will return a `200` Ok response status from the server.

## Get specific Vacation
Use the following command to get a specific vacation by `id`.
```
GET /vacation/12345678
```
Will return vacation with the id `12345678`

A successful vacation will return a `200` Ok response status from the server.

## Approval flow

For the POST, PATCH and PUT methods, approvalInfo part of body object can be provided. The structure is listed below:

```
"approvalInfo": {
    "approvers": [
        {
            "id": "5b55cd2e08d6f6069a94dcab",
            "_id": "5b5724b1ba95e739516deef9"
        },
        {
            "id": "5b55c4dda9993e7e7d14c169",
            "_id": "5b5724b1ba95e739516deef8"
        }
    ],
    "requesterNote": "I want vacation!",
    "approverNote": "Good!",
    "approvedOrRejectedById": "5b55cd2e08d6f6069a94dcab",
    "approvedOrRejectedDate": "2018-07-28T09:12:00.000Z"
}
```

The fields above are allowed, forbidden or required depends on `type` value provided in body. Table below shows, which keys are allowed for types.

`Type` field value | approvers | requesterNote | approverNote | approvedOrRejectedById | ApprovedOrRejectedDate
--- | --- | --- | --- | --- | ---
WAITING_FOR_APPROVAL | allowed* | allowed | denied | denied | denied
APPROVED | allowed* | allowed | allowed | required | required
REJECTED | allowed* | allowed | allowed | required | required

The asterisk sign is explained in the approvers logic below.

# Approvers logic

In hubplanner company approvers can be set. From them user can specify default approvers for the resource. Default approvers of resource are a subset of company approvers.
Vacation request can be approved by any of company approvers. By default, if no approvers are provided in request body, the resource default approvers will be set as request approvers.
If the resource doesn't have any default approvers, it's required to put any approvers in the request body, otherwise API will respond with bad request error. The approvers put in the body 
need to be company approvers. If the API user provide one of the company approvers in the request body and the resource also has default approvers, the approvers list will contain both
the resource provided in the body and the default approvers. Request can be approved only by one of the approvers. The example situation with approvers is explained below.

We have given company approvers:

Approver | ID
--- | ---
Adam | 1
Lisa | 2
Caroline | 3
Tom | 4

Resource default approvers are Adam and Caroline. User can put in the request body Lisa's and Tom's IDs as approvers and in the result, all 4 approvers will be set for the resource. If user provides
Adam and Lisa in the body, Adam, Lisa and Caroline will be set as approvers for the user. If user will provide Lisa and Ann (who is not an approver), the request will be rejected. API won't let you
provide empty approvers too. So make sure to provide them in request body or set default approvers for resources.

## Create a new Vacation
Create a new Vacation.
```
POST /vacation
```
An example of a vacation for resource id `5b55c4dda9993e7e7d14c16d`. Note: These are the minimum required fields. 

```
{
    "start": "2018-07-25",
    "end": "2018-07-26",
    "resource": "5b55c4dda9993e7e7d14c16d",
    "type": "WAITING_FOR_APPROVAL"
}
```
If you do not pass in `percentAllocation` it will be set to full day.

for example when requesting vacation for half day:

```
{
"start": "2018-07-25",
    "end": "2018-07-26",
    "resource": "5b55c4dda9993e7e7d14c16d",
    "type": "WAITING_FOR_APPROVAL",
    "percentAllocation": "50"
}
```

If You want to create `APPROVED` or `REJECTED` vacation, the minimum request body is shown below:

```
{
    "start": "2018-07-25",
    "end": "2018-07-26",
    "resource": "5b55c4dda9993e7e7d14c16d",
    "type": "APPROVED",
    "approvalInfo": {
    	"approvedOrRejectedDate": "2018-07-29",
    	"approvedOrRejectedById": "5b571f9961610c2c894b5612"
    }
}
```

The server will return vacation object in the format specified on the top of the page once created including the newly created vacation ID `_id`

A successful create will return a `201` Ok response status from the server.

## Update vacation
Update an existing vacation.
```
PUT /vacation/123456789
```
will update the vacation with the id 123456789. You can provide only the fields that are needed to be updated. Note that if you provide `type` with `APPROVED` value, you need to
also provide `approvalInfo` along.

A successful update will return a `200` Ok response status from the server.

## Patch vacation
Patch an existing vacation.
```
PATCH /vacation/123456789
```
will patch the vacation with the id 123456789. You can only provide the fields that are needed to be patched. It is preferred method over `PUT` to update the vacation.

A successful patch will return a `200` Ok response status from the server as well as patched vacation object.

## Delete a vacation
Use the following command to delete a specific vacation by `id`.
```
DELETE /vacation/12345678
```
Will delete booking with the id `12345678`

A successful delete will return a `200` Ok response status from the server.
