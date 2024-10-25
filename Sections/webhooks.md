# Webhooks
You can use Hub Planners webhooks to tap into real time events that are triggered in the Hub Planner application and use those events in other third party softwares. A simple example of usage could be when a New Project is created in Hub Planner, you want to create that project in another service. You can apply this concept to the support events below. 

## Creating a New Webhook

To use the webhooks functionality you first need to subscribe to the choosen event. Below is a url and example of how to create such a subscription.

```
POST /subscription
```
With the request body passed in JSON format.

```
{
   "event":"project.update",
   "target_url":"http://mycompany.com/webhooks_listener"
}
```

Property | Type | Description                                         | Required
--- | --- |-----------------------------------------------------| ---
event | String (*check supported events for possible values*) | name of event for which you want to subscribe       | YES
target_url | String | url of your endpoint to listen for subscribed event | YES
authorization_token | String | secret authorization token to validate requests | NO

## Supported Events
The following table outlines the supported events that you can subscribe to. 

Event name | Description
--- | ---
project.update | Triggers when project is created or updated
resource.update | Triggers when resource is created or updated
booking.create | Triggers when booking is created 
timeEntry.create | Triggers when time entry is created
timeEntry.update | Triggers when time entry is updated
timeEntry.create.update | Triggers when time entry is created or updated
timeEntry.delete | Triggers when time entry is deleted
booking.update | Triggers when booking is updated
booking.delete | Triggers when booking is deleted
booking.delete.multiple | Triggers when repeated booking is deleted

In a response you will receive your subscription together with a generated unique id (which you can use in other actions) and subscription creation time. 

External service must response with one of the following statuses: 200, 201 or 204.

An example response will look like below.

```
{
   "_id": "448847eea20e6d05bc53a49a",
   "companyId": "59841c04844e6738c8d45123",
   "creationDate": "2017-06-01T10:56:34.088Z",
   "target_url": "http://mydomain.hubplanner.com/webhooks_listener",
   "event": "project.update",
   "authorization_token": "secret-token-123"
}
```

## Secret authorization token
Adding `authorization_token` as secret authorization token to validate requests, which is sent with the webhook request as `hubplanner-token` HTTP header. Your webhook endpoint can check the token to verify the request is legitimate.

## Responses when Subscribed to Webhooks
The following code examples show sample responses when subscribed to the different webhooks. Note that `createdBy` and `updatedBy` fields in booking webhooks are deprecated fields and will be removed in the future. They are replaced by `bookingCreatorId` and `lastUpdatedById` fields accordingly.

*project.update*

```
{
    "event" : "project.update",
    "resourceIds" : [],
    "projectManagerIds" : [],
    "end" : null,
    "start" : null,
    "useProjectDays" : false,
    "workDays" : [ 
        false, 
        true, 
        true, 
        true, 
        true, 
        true, 
        false
    ],
    "includeBookedTimeGrid" : true,
    "tags" : [],
    "customFields" : [],
    "type" : "REGULAR",
    "status" : "Active",
    "name" : "Test Project",
    "projectId" : ObjectId("59a66aafe1b60a251c86b6a2")
}
```
*resource.update*

```
{
	"event" : "resource.update",
	"isProjectManager" : true,
	"useResourceAvailability" : false,
	"customAvailabilities" : [ 
		{
			"_id" : ObjectId("59a66af0e1b60a251c86b6ad"),
			"weekDays" : {
				"sunday" : {
					"minutes" : 0,
					"workDay" : false
				},
				"saturday" : {
					"minutes" : 0,
					"workDay" : false
				},
				"friday" : {
					"minutes" : 0,
					"workDay" : true
				},
				"thursday" : {
					"minutes" : 0,
					"workDay" : true
				},
				"wednesday" : {
					"minutes" : 0,
					"workDay" : true
				},
				"tuesday" : {
					"minutes" : 0,
					"workDay" : true
				},
				"monday" : {
					"minutes" : 0,
					"workDay" : true
				}
			},
			"end" : null,
			"start" : null
		}
	],
	"tags" : [ 
		{
			"tagId" : ObjectId("59a66aeee1b60a251c86b6aa"),
			"value" : "superstar",
			"_id" : ObjectId("59a66af0e1b60a251c86b6ae")
		}
	],
	"customFields" : [],
	"type" : "REGULAR",
	"status" : "STATUS_ACTIVE",
	"role" : "ROLE_TEAM",
	"lastName" : "Smith",
	"firstName" : "Alan",
	"resourceId" : ObjectId("59a66af0e1b60a251c86b6ab"),
	"email" : "smith@test.com"
}
```

*booking.create*

```
{
    "event": "booking.create",
        "duration": "24 hrs",
        "categoryName": "General",
        "end": {
            "day": "14th",
            "month": "Sep",
            "year": "2017",
            "date": "2017-09-14T18:00:00.000Z",
            "formatted": "Sep 14th 2017"
        },
        "start": {
            "day": "12th",
            "month": "Sep",
            "year": "2017",
            "date": "2017-09-12T09:00:00.000Z",
            "formatted": "Sep 12th 2017"
        },
        "createdBy":"5c62978a7b10e376c13faaaa",
        "updatedBy":"5c62978a7b10e376c13fbbbb",
        "bookingCreatorName":"Mike Tyson",
        "bookingCreatorId":"5c62978a7b10e376c13faaaa",
        "lastUpdatedById":"5c62978a7b10e376c13fbbbb",
        "lastUpdatedByName":"Andrew Hammonds",
        "resourceName": "Resource 1",
        "projectName": "Test Project",
        "projectId": "5963b1320eb98a0be485a1d4",
        "resourceId": "5963b1320eb98a0be485a1cb",
        "bookingId": "5363b1320ec94a0be400a1de"		
}
```

*timeEntry.create*

```
{
    "event" : "timeEntry.create",
    "status" : "UNSUBMITTED",
    "categoryName" : "General",
    "minutes" : "180",
    "date" : "2017-08-30T00:00",
    "projectId" : "59a008a8ab3cad27e08a9374",
    "timeEntryId" : "59a3ea783e1e8427b4547a6d"
}
```

*timeEntry.update*

```
{
    "event" : "timeEntry.update",
    "status" : "SUBMITTED",
    "categoryName" : "General",
    "minutes" : "180",
    "date" : "2017-08-30T00:00",
    "projectId" : "59a008a8ab3cad27e08a9374",
    "timeEntryId" : "59a3ea783e1e8427b4547a6d"
}
```

*timeEntry.create.update*

```
{
    "event" : "timeEntry.create.update",
    "status" : "SUBMITTED",
    "categoryName" : "General",
    "minutes" : "180",
    "date" : "2017-08-30T00:00",
    "projectId" : "59a008a8ab3cad27e08a9374",
    "timeEntryId" : "59a3ea783e1e8427b4547a6d"
}
```

*timeEntry.delete*

```
{
    "event" : "timeEntry.delete",
    "status" : "SUBMITTED",
    "categoryName" : "General",
    "minutes" : "180",
    "date" : "2017-08-30T00:00",
    "projectId" : "59a008a8ab3cad27e08a9374",
    "timeEntryId" : "59a3ea783e1e8427b4547a6d"
}
```

*booking.update*

```
{
    "bookingId":"5adefe5561d3404890330f04",
    "resourceId":"5addf4cd3b1d17531862d2b3",
    "projectId":"5ad9d08c880646448864427c",
    "projectName":"Test Project",
    "resourceName":"Resource 1",
    "createdBy":"5c62978a7b10e376c13faaaa",
    "updatedBy":"5c62978a7b10e376c13fbbbb",
    "bookingCreatorName":"Mike Tyson",
    "bookingCreatorId":"5c62978a7b10e376c13faaaa",
    "lastUpdatedById":"5c62978a7b10e376c13fbbbb",
    "lastUpdatedByName":"Andrew Hammonds",
    "start": {
        "formatted":"Apr 24th 2018",
        "date":"2018-04-24T07:00:00.000Z",
        "year":"2018",
        "month":"Apr",
        "day":"24th"
    },
    "end":{
        "formatted":"Apr 25th 2018",
        "date":"2018-04-25T16:00:00.000Z",
        "year":"2018",
        "month":"Apr",
        "day":"25th"
    },
    "categoryName":"General",
    "duration":"16 hrs",
    "event":"booking.update"
}

```

*booking.delete*

```
{
    "bookingId":"5addef855d2d554e026028a9",
    "resourceId":"5ad9d08c8806464488644245",
    "projectId":"5adda32626bc1357570172b4",
    "projectName":"Test Project",
    "resourceName":"Resource 1",
    "createdBy":"5c62978a7b10e376c13faaaa",
    "updatedBy":"5c62978a7b10e376c13fbbbb",
    "bookingCreatorName":"Mike Tyson",
    "bookingCreatorId":"5c62978a7b10e376c13faaaa",
    "lastUpdatedById":"5c62978a7b10e376c13fbbbb",
    "lastUpdatedByName":"Andrew Hammonds",
    "deletedById":"5c62978a7b10e376c13faaaa", //valid for deleted webhook only
    "deletedByResourceName":"Andrew Hammonds", //valid for deleted webhook only
    "start": {
        "formatted":"May 10th 2018",
        "date":"2018-05-10T07:00:00.000Z",
        "year":"2018",
        "month":"May",
        "day":"10th"
    },
    "end": {
        "formatted":"May 12th 2018",
        "date":"2018-05-12T16:00:00.000Z",
        "year":"2018",
        "month":"May",
        "day":"12th"
    },
    "categoryName":"General",
    "duration":"16 hrs",
    "event":"booking.delete"
}

```

*booking.delete.multiple*

```
[
    {
        "bookingId":"5addef855d2d554e026028a8",
        "resourceId":"5ad9d08c8806464488644245",
        "projectId":"5adda32626bc1357570172b4",
        "projectName":"Test Project",
        "resourceName":"Resource 1",
        "createdBy":"5c62978a7b10e376c13faaaa",
        "updatedBy":"5c62978a7b10e376c13fbbbb",
        "bookingCreatorName":"Mike Tyson",
        "bookingCreatorId":"5c62978a7b10e376c13faaaa",
        "lastUpdatedById":"5c62978a7b10e376c13fbbbb",
        "lastUpdatedByName":"Andrew Hammonds",
        "start": {
            "formatted":"May 10th 2018",
            "date":"2018-05-10T07:00:00.000Z",
            "year":"2018",
            "month":"May",
            "day":"10th"
        },
        "end": {
            "formatted":"May 12th 2018",
            "date":"2018-05-12T16:00:00.000Z",
            "year":"2018",
            "month":"May",
            "day":"12th"
        },
        "categoryName":"General",
        "duration":"16 hrs",
        "event":"booking.delete.multiple"
    },
    {
        "bookingId":"5addef855d2d554e026028a9",
        "resourceId":"5ad9d08c8806464488644245",
        "projectId":"5adda32626bc1357570172b4",
        "projectName":"Test Project",
        "resourceName":"Resource 1",
        "createdBy":"5c62978a7b10e376c13faaaa",
        "updatedBy":"5c62978a7b10e376c13fbbbb",
        "bookingCreatorName":"Mike Tyson",
        "bookingCreatorId":"5c62978a7b10e376c13faaaa",
        "lastUpdatedById":"5c62978a7b10e376c13fbbbb",
        "lastUpdatedByName":"Andrew Hammonds",
        "start": {
            "formatted":"May 11th 2018",
            "date":"2018-05-11T07:00:00.000Z",
            "year":"2018",
            "month":"May",
            "day":"11th"
        },
        "end": {
            "formatted":"May 13th 2018",
            "date":"2018-05-13T16:00:00.000Z",
            "year":"2018",
            "month":"May",
            "day":"13th"
        },
        "categoryName":"General",
        "duration":"16 hrs",
        "event":"booking.delete.multiple"
    }
]
```

## Unsubscribing from a Webhook

To unsubscribe from a particular webhook you need to use a subscription identifier (see _id parameter from creation part) from previously created subscription.

```
DELETE /subscription/{subscription_id}
```
