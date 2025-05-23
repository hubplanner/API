# Custom Fields
The custom fields API allows you to create custom field templates with the following endPoints. 

### Properties
Property | Type | Description
--- | --- | ---
filterGrid | *boolean* | Make the custom field searchable in the scheduler. 
label | *string* | Name of the custom field.
instructions | *string* | Instructions how to use custom field.
defaultValue | *string* | Default value, if there should be any for field type. Used only by fields without choices
defaultRadioId | *string* | Id of default value for radio button
placeholderText | *string* | Placeholder text for input fields.
choices | *objects* | Array of choices selectable by users
canResourceEdit | *boolean* | Whenever regular resources can edit this field
type | *enum* | Type of field, one of TEXT, TEXTAREA, EMAIL, DATE, COLOR, NUMBER, CHECKBOX, SELECT, RADIO
category | *enum* | Whenever this is project or resource custom field. Always will be RESOURCE for this endpoint
status | *enum* | Status of the custom field
allowMultipleValues | *boolean* | For select fields, whenever multiple values should be possible to be chosen at once
characterLimit | *number* | For number of text fields, limit of characters
maxValue | *number* | Max value for number fields
minValue | *number* | Min value for number fields
stepValue | *number* | For number fields step between possible values.
weekStartOn | *number* | Number of day week starts on, starting with 0 as Sunday, 1 Monday. Used by date field

There are two different templates for custom fields, one that has a single property (string) value and one that allows for multiple linkable values stored in [choices](#Choices) array. The templateType property will dictate which template is being used.

## Choices

Items in choices array have the following properties:
Property | Type | Description
--- | --- | ---
value | *string* | Choice value

# Endpoints

## Search
Search for custom field templates

### Resource
```
POST /resource/customField/template/search
```
### Project
```
POST /project/customField/template/search
```

## Get
### Resource
```
GET /resource/customField/template
GET /resource/customField/template/:id
```
### Project
```
GET /project/customField/template
GET /project/customField/template/:id
```

## Create
### Resource
```
POST /resource/customField/template
```
### Project
```
POST /project/customField/template
```

### Example payloads
`POST /resource/customField/template`

#### Text
```
{
  "type": "TEXT",
  "label": "Field Name",
  "instructions": "Enter the value",
  "placeholderText": "",
  "status": "ACTIVE",
  "allowMultipleValues": false,
  "isRequired": false,
  "canResourceEdit": false,
  "characterLimit": "",
  "isChoicesSortedAlphabetically": true
}
```

#### Dropdown
```
{
  "type": "select",
  "label": "Field Name",
  "instructions": "Select the value",
  "placeholderText": "Field Placeholder",
  "defaultValue": "",
  "status": "ACTIVE",
  "choices": [
    {
      "value": "a"
    },
    {
      "value": "b"
    }
  ],
  "allowMultipleValues": "false",
  "isRequired": "true",
  "canResourceEdit": "true",
  "isChoicesSortedAlphabetically" : "true"
}
```

## Update
### Resource
```
PUT /resource/customField/template/:id
```
### Project
```
PUT /project/customField/template/:id
```

### Example payloads
`POST /resource/customField/template/669554d27dc15b5590a1b831`

#### Text
```
{
  "_id": "669554d27dc15b5590a1b831",
  "type": "TEXT",
  "label": "Updated Field Name",
  "instructions": "Enter the value",
  "placeholderText": "",
  "status": "ACTIVE",
  "allowMultipleValues": false,
  "isRequired": true,
  "canResourceEdit": false,
  "characterLimit": "30",
  "isChoicesSortedAlphabetically": true
}
```

#### Dropdown
```
{
  "_id": "669554d27dc15b5590a1b83b",
  "type": "select",
  "label": "Updated Field Name",
  "instructions": "Select the value",
  "placeholderText": "Field Placeholder",
  "defaultValue": "",
  "status": "ACTIVE",
  "choices": [
    {
      "_id": "6710c8991bb1818b0a409e0b",
      "value": "Updated a"
    },
    {
      "value": "c"
    },
    {
      "value": "d"
    }
  ],
  "allowMultipleValues": "false",
  "isRequired": "false",
  "canResourceEdit": "true",
  "isChoicesSortedAlphabetically" : "true"
}
```

###### Modify custom field choices of SELECT, RADIO or CHECKBOX type.

You can modify custom field choices, updating `choices` array and save whole custom field object making `Update` request.

Actions:
- add new choices to existing `choices` array
```
{
  "value": "c"
}
```
- update existing choices `value` property in array
```
{
  "_id": "6710c8991bb1818b0a409e0b",
  "value": "Updated a"
}
```
- remove some choices from array

*Making `Update` request, `choices` array must be always complete. Any modifications in this array will trigger listed actions on previously saved data.*

There are also specific endpoints to simplify adding new choices process, described in [Add choices](https://github.com/hubplanner/API/blob/master/Sections/custom-fields.md#add-choices) section.

## Delete
### Resource
```
DELETE /resource/customField/template/:id
```
### Project
```
DELETE /project/customField/template/:id
```

## Add choices
Add choices to custom fields of SELECT, RADIO or CHECKBOX type.

### Resource
```
POST /resource/customField/template/:id/addChoices
```
### Project
```
POST /project/customField/template/:id/addChoices
```

#### Example payload
```
[
  {
    "value": "new choice 1"
  },
  {
    "value": "new choice 2"
  }
]
```

Will return complete custom field with all properties, containing new added choices.

A successful request will return a `200` Ok response status from the server.

###### Other way to add (update and delete) choices

You can add choices using `Update` functionality. Get custom field using `Search` or `Get`, add new choices to `choices` array and save whole custom field object making `Update` request.

Do the same, if you need to update or remove some choices. Just update or remove existing object from "choices" array and save whole custom field object making `Update` request.
