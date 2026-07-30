## Public Holiday Calendars

Holiday Calendars are the named collections of holidays used for resource scheduling. Every company has exactly one default calendar called "Company Holidays". Additional calendars require the Global Public Holidays extension to be installed.

### Calendar Object

```
{
    "_id": "5df9e4335de076d05b14ffaf",
    "name": "Global Company Holidays",
    "metadata": "",
    "createdDate": "2020-01-13T10:43:18.418Z",
    "updatedDate": "2021-01-14T13:27:17.218Z",
    "holidays": [
        {
            "_id": "5e1c49c66357444ffe075293",
            "name": "Christmas Day",
            "date": "2020-12-25T00:00:00.000Z",
            "dateTicks": 1608854400000,
            "repeat": false,
            "color": "#ffe8ba",
            "metadata": "",
            "version": 2,
            "saveDate": "2021-01-14T13:27:17.218Z",
            "createdDate": "2020-10-19T09:05:40.312Z"
        }
    ]
}
```
The following is a description of the properties in the response.

Property | Type | Description | Required | Sortable
--- | --- | --- | --- | ---
_id | *string* | id of the Calendar | NO | NO
name | *string* | Calendar Name (Unique) | NO | NO
metadata | *string* | Custom Field (255 Characters) | NO | NO
createdDate | *string* | Calendar Creation Date | NO | NO
updatedDate | *string* | Calendar Updated Date | NO | NO
holidays | *object array* | A list of holidays within this calendar. These are raw holiday sub-documents, not the same shape as the `/holiday` endpoint response. | NO | NO

#### Calendar Holiday Sub-document

Each item in the `holidays` array is a raw holiday sub-document with the following shape.

Property | Type | Description
--- | --- | ---
_id | *string* | id of the Holiday
name | *string* | Holiday Name
date | *string* | Holiday date (ISO 8601)
dateTicks | *number* | Midnight-normalized epoch milliseconds
repeat | *boolean* | Whether the holiday recurs yearly
color | *string* | Hex color (e.g. `#ffe8ba`)
metadata | *string* | Custom metadata field
version | *number* | Internal version number
saveDate | *string* | Last save date (ISO 8601)
createdDate | *string* | Holiday creation date (ISO 8601)

## Get All Public Holiday Calendars

```
GET /calendar
```
Returns all holiday calendars for your company.

Server Response example below for calendars returned within an array.
```
[
    {
        "_id": "5df9e4335de076d05b14ffaf",
        "name": "Global Company Holidays",
        "metadata": "",
        "createdDate": "2020-01-13T10:43:18.418Z",
        "updatedDate": "2021-01-14T13:27:17.218Z",
        "holidays": [
            {
                "_id": "5e1c49c66357444ffe075293",
                "name": "Christmas Day",
                "date": "2020-12-25T00:00:00.000Z",
                "dateTicks": 1608854400000,
                "repeat": false,
                "color": "#ffe8ba",
                "metadata": "",
                "version": 2,
                "saveDate": "2021-01-14T13:27:17.218Z",
                "createdDate": "2020-10-19T09:05:40.312Z"
            }
        ]
    }
]
```

A successful request will return a `200` Ok response status from the server.

## Get a Public Holiday Calendar

```
GET /calendar/{{CALENDAR_ID}}
```
Will return the calendar with the specified `CALENDAR_ID`.

A successful request will return a `200` Ok response status from the server.

## Create a Public Holiday Calendar

```
POST /calendar
```
Create a new Public Holiday Calendar. This endpoint requires the Global Public Holidays extension to be installed. If the extension is not installed, the following error will be returned by the server:

```
{
    "message": "The extension 'holiday_calendars' is required to perform this action. Please activate it and try again.",
    "error": "EXTENSION_IS_NOT_ACTIVE",
    "code": "A2424",
    "properties": {
        "additionalInformation": {
            "extensionName": "holiday_calendars"
        }
    },
    "version": 2
}
```

An example request body:
```
{
    "name": "North American Team",
    "metadata": "Regional calendar for NA offices"
}
```

Property | Type | Description | Required
--- | --- | --- | ---
name | *string* | Calendar Name. Must be unique — a duplicate name will return a `CALENDAR_ALREADY_EXIST` error. | *YES*
metadata | *string* | Custom metadata field (255 Characters) | NO

The server will return the full calendar object once created including the newly created calendar ID `_id`.

A successful create will return a `201` Created response status from the server.

## Update a Public Holiday Calendar

```
PUT /calendar/{{CALENDAR_ID}}
```
Will update the calendar with the specified `CALENDAR_ID`. The request body accepts `name` and `metadata` only.

Without the Global Public Holidays extension, only the default calendar can be updated. Attempting to update a non-default calendar without the extension will return an `EXTENSION_IS_NOT_ACTIVE` error.

Property | Type | Description | Required
--- | --- | --- | ---
name | *string* | Calendar Name | *YES*
metadata | *string* | Custom metadata field (255 Characters) | NO

A successful update will return a `200` Ok response status from the server.

## Delete a Public Holiday Calendar

```
DELETE /calendar/{{CALENDAR_ID}}
```
Will delete the calendar with the specified `CALENDAR_ID`. The default company calendar cannot be deleted — attempting to do so will return an `ENTITY_DELETION_NOT_ALLOWED` error.

This endpoint requires the Global Public Holidays extension to be installed.

A successful delete will return a `200` Ok response status from the server.

## Get All Holidays

```
GET /holiday
```
Returns all holidays across all of the company's calendars, flattened into a single array. By default customer has one calendar, called "Company Holidays".

Server Response example below for 1 holiday returned within an array.
```
[
    {
        "_id": "5e96a89f9088ba10a2e933c1",
        "name": "Birthday",
        "color": "#0070c0",
        "date": "1985-04-18",
        "metadata": "",
        "createdDate": "2020-04-15T06:24:36.808Z",
        "updatedDate": "2020-04-15T06:24:36.808Z",
        "repeat": true
    }
]
``` 
The following is a description of the properties in the response.

Property | Type | Description | Required | Sortable
--- | --- | --- | --- | ---
_id | *string* | id of the Holiday | NO | NO
name | *string* | Holiday Name | NO | NO
color | *string* | Hex color (e.g. `#0070c0`) | NO | NO
date | *string* | Holiday date in `YYYY-MM-DD` format | NO | NO
metadata | *string* | Custom metadata field | NO | NO
createdDate | *string* | Holiday creation date | NO | NO
updatedDate | *string* | Holiday last updated date | NO | NO
repeat | *boolean* | Whether the holiday recurs yearly | NO | NO

## Get a Specific Holiday

```
GET /holiday/{{HOLIDAY_ID}}
```
Will return the holiday with the specified `HOLIDAY_ID`.

A successful request will return a `200` Ok response status from the server.

## Search Holidays

```
POST /holiday/search
```
If you want to query all holidays, for example for a date range:
```
{"date": {"$lt": "2014-07-15"}}
```

### Search Parameters
Use parameters to narrow your search. For example use `$nin` for not included, and use `$in` for included. Parameters for `$in` and `$nin` must be passed as an array within `[]`.

Property | Parameters
--- | ---
$nin | not included
$in | included
$lt | less than
$lte | less than or equal
$gt | greater than
$gte | greater than or equal

### Searchable Properties

Property | Parameters | Description
--- | --- | ---
_id | | Holiday id
metadata | $nin, $in | Custom metadata field
date | $lt, $lte, $gt, $gte | Holiday date
name | $nin, $in | Holiday Name
calendarId | $in, $nin | Filter by parent calendar id

A successful search will return a `200` Ok response status from the server.

## Create a New Holiday

```
POST /holiday
```
Create a new holiday on a calendar. If no `calendarId` is provided, the holiday is added to the default company calendar.

An example request body for a holiday on Christmas:
```
{
    "name": "Christmas 2024",
    "date": "2024-12-25",
    "color": "#FF0000",
    "repeat": true
}
```

Property | Type | Description | Required
--- | --- | --- | ---
name | *string* | Holiday Name | *YES*
date | *string* | Holiday date | *YES*
calendarId | *string* | Target calendar id. If omitted, the holiday is added to the default calendar. Creating a holiday on a non-default calendar requires the Global Public Holidays extension. | NO
color | *string* | Hex color (e.g. `#FF0000`) | NO
repeat | *boolean* | Whether the holiday recurs yearly | NO
metadata | *string* | Custom metadata field | NO

The server will return the full holiday object once created including the newly created holiday ID `_id`.

A successful create will return a `201` Created response status from the server.

## Update a Holiday

```
PUT /holiday/{{HOLIDAY_ID}}
```
Will update the holiday with the specified `HOLIDAY_ID`.

An example request body:
```
{
    "name": "Christmas Day",
    "date": "2024-12-25",
    "color": "#00FF00",
    "metadata": "Updated for 2024"
}
```

Property | Type | Description | Required
--- | --- | --- | ---
name | *string* | Holiday Name | *YES*
date | *string* | Holiday date | *YES*
color | *string* | Hex color | NO
metadata | *string* | Custom metadata field | NO

Updating a holiday on a non-default calendar requires the Global Public Holidays extension.

A successful update will return a `200` Ok response status from the server.

## Delete a Holiday

```
DELETE /holiday/{{HOLIDAY_ID}}
```
Will delete the holiday with the specified `HOLIDAY_ID`.

Deleting a holiday on a non-default calendar requires the Global Public Holidays extension.

A successful delete will return a `200` Ok response status from the server.
