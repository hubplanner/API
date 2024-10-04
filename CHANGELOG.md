## October 02, 2024

FEATURES:

* Allow to delete multiple time entries [[timesheets](https://github.com/hubplanner/API/blob/master/Sections/timesheets.md#delete-multiple-timeentries)]

IMPROVEMENTS:

* Allow to delete locked time entries [[timesheets](https://github.com/hubplanner/API/blob/master/Sections/timesheets.md#delete-a-timeentry)]

## September 25, 2024

IMPROVEMENTS:

* Performance improvements for Single Project Update [[project](https://github.com/hubplanner/API/blob/master/Sections/project.md#update-single-project)]

BUG FIXES:

* Issues with Project status label and Client data update making PATCH project [[project](https://github.com/hubplanner/API/blob/master/Sections/project.md#update-single-project)]

## September 17, 2024

FEATURES:

* Added customFieldTemplates endpoints [[custom-fields](https://github.com/hubplanner/API/blob/master/Sections/custom-fields.md)] 

## September 04, 2024

IMPROVEMENTS:

* Allow to set time entries 'locked' property [[timesheets](https://github.com/hubplanner/API/blob/master/Sections/timesheets.md)]

## August 23, 2024

IMPROVEMENTS:

* Improve PATCH error handling for all sections

## August 13, 2024

FEATURES:

* Added customFieldTemplates endpoints [[custom-fields](https://github.com/hubplanner/API/blob/master/Sections/custom-fields.md)] 

## June 27, 2024

IMPROVEMENTS:

* Improve bookings search error handling [[bookings](https://github.com/hubplanner/API/blob/master/Sections/bookings.md#search-bookings)]
* Performance improvements for bookings search [[bookings](https://github.com/hubplanner/API/blob/master/Sections/bookings.md#search-bookings)]

## May 06, 2024

IMPROVEMENTS:

* Added '$like' search option for 'name' property on Booking Category search [[booking-categories](https://github.com/hubplanner/API/blob/master/Sections/booking-categories.md#search-a-booking-category)]

## March 14, 2024

IMPROVEMENTS:

* Added 'customFieldsChoiceId' property to Projects search [[project](https://github.com/hubplanner/API/blob/master/Sections/project.md#search-projects)]
* Added 'choiceId' property to Project Custom Fields search [[project](https://github.com/hubplanner/API/blob/master/Sections/project.md#search-custom-fields)]
* Added 'customFieldsChoiceId' property to Resources search [[resource](https://github.com/hubplanner/API/blob/master/Sections/resource.md#search-resources)]
* Added 'choiceId' property to Resource Custom Fields search [[resource](https://github.com/hubplanner/API/blob/master/Sections/resource.md#search-custom-fields)]

## March 05, 2024

FEATURES:

* Added Project Custom Fields search [[project](https://github.com/hubplanner/API/blob/master/Sections/project.md#search-custom-fields)]
* Added Resource Custom Fields search [[resource](https://github.com/hubplanner/API/blob/master/Sections/resource.md#search-custom-fields)]

IMPROVEMENTS:

* Added Custom Fields Templates properties to Projects search [[project](https://github.com/hubplanner/API/blob/master/Sections/project.md#search-projects)]
* Added Custom Fields Templates properties to Resources search [[resource](https://github.com/hubplanner/API/blob/master/Sections/resource.md#search-resources)]

## February 20, 2024

IMPROVEMENTS:

* Added 'deleted', 'deletedDate' properties to Bookings search [[bookings](https://github.com/hubplanner/API/blob/master/Sections/bookings.md#search-bookings)]

## January 25, 2024

FEATURES:

* Added endpoint to add approver to ResourceGroup [[groups](https://github.com/hubplanner/API/blob/master/Sections/groups.md#add-approver-to-a-resourcegroup)]
* Added endpoint to remove approver from ResourceGroup [[groups](https://github.com/hubplanner/API/blob/master/Sections/groups.md#remove-approver-from-a-resourcegroup)]