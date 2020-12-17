<p align="center">
  <img alt="Hub Planner Logo" title="Hub Planner" src="/logo.png" width="250">
</p>
<p align="center" style="margin-top: 40px">
  <strong>API Documentation</strong> for Hub Planner
</p>
<p align="center">
  <a href="https://signup.hubplanner.com">Free Trial</a>
  |
  <a href="https://hubplanner.com">Home Page</a>
</p>

===

Welcome to the Hub Planner API which provides programmatic access to Hub Planner Resource Management and Timesheets https://hubplanner.com

The following [Sections](https://github.com/hubplanner/API/tree/master/Sections) are available:

* [Projects](https://github.com/hubplanner/API/blob/master/Sections/project.md)
* [Resources](https://github.com/hubplanner/API/blob/master/Sections/resource.md)
* [Timesheets](https://github.com/hubplanner/API/blob/master/Sections/timesheets.md)
* [Bookings](https://github.com/hubplanner/API/blob/master/Sections/bookings.md)
* [Events](https://github.com/hubplanner/API/blob/master/Sections/events.md)
* [Public Holidays](https://github.com/hubplanner/API/blob/master/Sections/holidays.md)
* [Groups](https://github.com/hubplanner/API/blob/master/Sections/groups.md)
* [Milestones](https://github.com/hubplanner/API/blob/master/Sections/milestones.md)
* [Billing rates](https://github.com/hubplanner/API/blob/master/Sections/billingrate.md)
* [Webhooks](https://github.com/hubplanner/API/blob/master/Sections/webhooks.md)
* [Clients](https://github.com/hubplanner/API/blob/master/Sections/clients.md)
* [Vacation](https://github.com/hubplanner/API/blob/master/Sections/vacation.md)
* [Project managers](https://github.com/hubplanner/API/blob/master/Sections/project-manager.md)
* [Unassigned work](https://github.com/hubplanner/API/blob/master/Sections/unassigned-work.md)
* [Project tag](https://github.com/hubplanner/API/blob/master/Sections/project-tag.md)
* [Resource tag](https://github.com/hubplanner/API/blob/master/Sections/resource-tag.md)
* [Booking Categories](https://github.com/hubplanner/API/blob/master/Sections/booking-categories.md)

You can use the API to integrate Hub Planner with your own third party applications or generally integrate with your existing back-office setup.

## Zapier Integration

We offer an integration with Zapier. Please [Visit Here](https://zapier.com/apps/hub-planner/integrations) to get access and start usign Zaps with HUb Planner.

## API Support

If you have a question about using the API or have noticed an error or omission in the documentation. Please feel free to open an [issue](https://github.com/hubplanner/API/issues) on GitHub with your question and we will attend to it.

If you have any direct implementation issues, please contact the tech team at the following address hello@hubplanner.com and add API as as the Subject. 

## API Updates and Changes

We will be managing the API via GitHub, so please watch the Hub Planner API repository to receive email notification of updates to the API documentation. 

## API Limits

For security reasons we have a daily limit of 6000 API calls and burst limits of 50 per 5 seconds on every account. Please be careful to avoid these limits as otherwise you will get an error response from the API.

## Sharing

If you've built something interesting with the Hub Planner API, made a wrapper for a certain code language or integrated with a third party software you would like to share or think will help others, then please let us know at hello@hubplanner.com

## API Data Formats

Hub Planner API is a RESTful API that uses HTTP requests and returns JSON for all responses. 

All URLs start with the root URL: 

```
https://api.hubplanner.com/v1/
```
Content-Type and Accept must be defined in the header of all requests. 

```
GET resource/123
Accept: application/json
Content-Type: application/json
```

Please note that all requests to the Hub Planner API must be made over HTTPS.

### Pagination

Most of the above areas can be paginated using url parameters `limit` and `page`. For Bookings and Time Entries passing no limit returns 20 results by default which can then be paginated, while other end points for Project and Resources will return all results. 

The max `limit` you can set is `1000`. 

If you pass a limit of `0` or a limit of > `1000`, you will get a Bad Request `400` response from the server.

The example call to make use of pagination looks like this:

```
GET /project?page=0&limit=20
```
Which will paginate endpoint with 20 results per page. Pages start numbering with `0`. If you want to get all results you should loop trough pages until you reach page with less than requested amount of elements(in this example less than 20).

The endpoints that can be paginated in most areas are `GET /areaName` and `POST /areaName/search`.

### Sorting results

Most of the endpoints can be sorted ascending or descending based on some of the properties. Documentation for each area you have access to lists sortable
fields in the property table. Results can be sorted for `GET /areaName` and `POST /areaName/search` requests.

To sort the data add `sort` parameter to the url, followed by field you want to sort by. Prefix the property with minus sign(`-`) to sort in descending order.
For example:

```
GET /projectGroup?sort=-name
```

Will sort the project groups in descending order based on their names.

You can chain multiple sort arguments to create more advanced sort results. For example:

```
GET /projectGroup?sort=-groupType&sort=name
```

Will first sort project groups by their group types in descending order, then sort each group type alphabetically by name. Sample response(with unnecessary
properties ommited):

```
[
   {
      "name":"Eric's Projects",
      "groupType":"USER",
   },
   {
      "name":"Greg's Projects",
      "groupType":"USER",
   },
   {
      "name":"Rudolf's Projects",
      "groupType":"USER",
   },
   {
      "name":"Active Projects",
      "groupType":"SYSTEM",
   },
   {
      "name":"Archived Projects",
      "groupType":"SYSTEM",
   },
   {
      "name":"Events",
      "groupType":"SYSTEM",
   },
   {
      "name":"Floating projects",
      "groupType":"SYSTEM",
   },
   {
      "name":"Pending projects",
      "groupType":"SYSTEM",
   },
   {
      "name":"Planned projects",
      "groupType":"SYSTEM",
   }
]
```

It's suggested that you use sort argument along with pagination.

## User Agent Identification

Remember to write your application carefully. In case of abuse you may be blocked, disallowing further API access. As an act of courtesy, please provide User-Agent strings denoting your application.

`User-Agent: My Hub Planner Import App (my-name@my-email.com)`

## Authentication

Hub Planner API is authenticated with a OAuth 2.0 Bearer Token.

You must supply an Authorization header with the token for all requests. 

`Authorization: xxx`

Where xxx is Your generated API key. Do not provide `Bearer` keyword before API key in the header.

You must enable API access and generate your API key in order to use the Hub Planner API. The API key is available in All Accounts with Administrator privileges and higher. To generate your API key and enable the API login to your Hub Planner account and navigate to 

`Settings -> API`

Here you can generate your key for different rights and enable access.

There are 2 types of API keys you can generate.
* Read Only
* Read & Write

Please note if you decide to disable access to the API. All API access will be revoked for all generated keys. The generated keys should be considered as sensitive as passwords and must not be shared or distributed to untrusted parties.

## Error Codes & Responses

Overview of possible HTTP status codes

Code | Text | Description
--- | --- | ---
200 | OK | Success.
201 | OK | Created.
400 | Bad Request | The request could not be understood by the server due to malformed syntax. The client SHOULD NOT repeat the request without modifications.
401 | Unauthorized | The request requires user authentication @Authentication
403 | Forbidden | The request is understood, but it has been refused or access is not allowed.
404 | Not Found | The URI requested is invalid or the resource requested, such as a user, does not exists.
429 | To Many Requests | This status code indicates that the user has sent too many requests in a given amount of time ("rate limiting"). We currently allow 2 requests / second per account. 
500 | Internal Server Error | Something unexpected broke. Please raise an [issue](https://github.com/hubplanner/API/issues) so we can investigate your problem.
502 | Bad Gateway | Hub Planner API is down or temporary not accessible. 

