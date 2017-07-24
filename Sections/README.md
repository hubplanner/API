Hub Planner API Sections
===

Welcome to the Hub Planner API. The Hub Planner API provides programmatic access to the following areas

* [Projects](https://github.com/hubplanner/API/blob/master/Sections/project.md)
* [Resources](https://github.com/hubplanner/API/blob/master/Sections/resource.md)
* [Timesheets](https://github.com/hubplanner/API/blob/master/Sections/timesheets.md)
* [Bookings](https://github.com/hubplanner/API/blob/master/Sections/bookings.md)
* [Events](https://github.com/hubplanner/API/blob/master/Sections/events.md)
* [Holidays](https://github.com/hubplanner/API/blob/master/Sections/holidays.md)
* [Groups](https://github.com/hubplanner/API/blob/master/Sections/groups.md)
* [Milestones](https://github.com/hubplanner/API/blob/master/Sections/milestones.md)

#### Pagination

Most of the above areas can be paginated using url parameters `limit` and `page`. By default the limit is `0`, which means unlimited. In the future unlimited
listings will be disabled and the results will need to be paginated, so we suggest adding support for pagination as soon as possible.

The example call to make use of pagination looks like this:

```
GET /project?page=0&limit=20
```
Which will paginate endpoint with 20 results per page. Pages start numbering with `0`. If you want to get all results you should loop trough pages until
you reach page with less than requested amount of elements(in this example less than 20).

The endpoints that can be paginated in most areas are `GET /areaName` and `POST /areaName/search`.