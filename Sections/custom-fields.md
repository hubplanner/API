# Custom Fields

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

### Choices

Items in choices array have following properties:
Property | Type | Description
--- | --- | ---
value | *string* | Choice value

## Resource

### Search
```
POST /resource/customField/template/search
```

### Get
```
GET /resource/customField/template
GET /resource/customField/template/:id
```

### Create
```
POST /resource/customField/template
```

### Update
```
PUT /resource/customField/template/:id
```

### Delete
```
DELETE /resource/customField/template/:id
```


## Project

### Search
```
POST /project/customField/template/search
```

### Get
```
GET /project/customField/template
GET /project/customField/template/:id
```

### Create
```
POST /project/customField/template
```

### Update
```
PUT /project/customField/template/:id
```

### Delete
```
DELETE /project/customField/template/:id
```
