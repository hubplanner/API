## Get All Booking Categories

```
GET {{API_URL}}/categories
```
A response from the server would be as follows:
```
[
  {
      "_id": "5f057949f338cd432a794a12",
      "name": "At Client",
      "gridColor": "#81A489",
      "createdDate": "2020-07-08T07:44:09.929Z",
      "updatedDate": "2020-07-08T07:44:09.929Z",
      "type": "CUSTOM"
  }
]

The call will return an array of booking categories for your company.

Property type shows if the booking category is default in its group. It can be set as `NON_OPTIONAL` (default) or CUSTOM.
