## Creating a new web hook

To use web hooks functionality you need to subscribe to first choosen event. Below url and example how to create such a subscription.

```
POST /subscription
```
With request body in JSON format.

```
{
   "event":"project.update",
   "target":"http://mycompany.com/webhooks_listener"
}
```

Property | Type | Description | Required
--- | --- | --- | ---
event | String (*check supported events for possible values*) | name of event for which you want to subscribe | YES
target | String | url of your endpoint to listen for subscribed event | YES



*Supported events*

Event name | Description
--- | ---
project.update | Triggers when project is created or updated
resource.update | Triggers when resource is created or updated
booking.create | Triggers when booking is created 
timeEntry.create | Triggers when time entry is created 

In a response you will receive your subscription together with generated unique id (which you can use in other actions) and subscription creation time. 
An example response will look like below.

```
{
   "_id": "448847eea20e6d05bc53a49a",
   "companyId": "59841c04844e6738c8d45123",
   "creationDate": "2017-06-01T10:56:34.088Z",
   "target": "http://mycompany.com/webhooks_listener",
   "event": "project.update",
}
```


## Unsubscribing from a web hook


To unsubscribe from a particular web hook you need to use subscription identifier (see _id parameter from creation part) from previously created subscription.

```
DELETE /subscription/{subscription_id}
```
