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
    metadata: '' 
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
{"status" : {"$nin": "STATUS_ACTIVE" } }
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
{
	name: "My First Project"
}
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
DEL /project/12345678
```
Will delete project with the id `12345678`

A successful delete will return a `200` Ok response status from the server.

## Add a Resource to a Project
Add a Resource to a Project
```
POST project/addResourcesToProject/projectId
Accept: application/json
Content-Type: application/json

'{"resourceIds":["654654365436543634","654365436543654365436"]}'
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

'{"projectIds":["654654365436543634","654365436543654365436"]}'
```
Property | Type | Description
--- | --- | ---
resourceId | string | Resource ID e.g. 654654365436543634
projectIds | array | Array of Project ID's

A successful remove will return a `200` Ok response status from the server.
