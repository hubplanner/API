## Get All Project Managers

```
GET /project-manager
```

call will return all project managers.

Server Response example below for 1 project manager returned within an array.

```
[{
    "_id": "5b88038d2728e43e11111111",
    "email": "example@email.com",
    "metadata": "",
    "createdDate": "2018-08-30T14:34:42.855Z",
    "updatedDate": "2018-08-31T07:28:06.391Z",
    "note": "",
    "firstName": "Example",
    "lastName": "ExampleSurname",
    "status": "STATUS_ACTIVE",
    "role": "ROLE_OWNER",
    "isProjectManager": true,
    "links": {
        "iconLink5": "fa-link",
        "link5": "",
        "iconLink4": "fa-link",
        "link4": "",
        "iconLink3": "fa-link",
        "link3": "",
        "iconLink2": "fa-link",
        "link2": "",
        "iconLink1": "fa-link",
        "link1": ""
    },
    "billing": {
        "useDefault": false,
        "id": null,
        "rate": 0
    },
    "customFields": [],
    "useCustomAvailability": false
}]
```