## Overview
This is an example of how the Harvest API and the Hub Planner API can work together. The aim of this example is to demonstrate how you can pull in the following information from Harvest and Create it in Hub Planner. The information we will pull from Harvest is as follows

* People
* Projects
* TimeEntries

## Important Information before you run this example
* We advise you to first run this example on a Hub Planner trial account and make sure all data is correctly imported before using your real account. 

* This example is built using 3rd party applications and modifications of the 3rd party source can break or change the expected result at any given time. 

* This example might require modifciations to fully function with your account and existing data. 

## Requirements
In order to run this example you will need the following:

* [node.js](http://nodejs.org/)
* [npm](https://www.npmjs.org/)
* Harvest: Username / Password / subdomain
* Hub Planner: Read Write API Key (From Settings -> API)

`Please note: We do not provide support for installation of node or npm.` 

## Adding your Data
There are 2 parts of the code where you need to enter your data. 

### Harvest Data
You need to enter your Harvest `subdomain`, `email` and `password` in the fields below. 
```
var Harvest = require('harvest')
  , harvest = new Harvest({
      subdomain: "add your Harvest subdomain",
      email: "add your Harvest login email address",
      password: "add your Harvest Password"

});
```
You need to enter your Hub Planner `subdomain`, `authorization`(READ / WRITE API KEY) in the fields below. 
```
    
var HubPlannerConfig = {
    domain:"https://api.hubplanner.com",
    contentType: 'application/json',
    authorization: 'Add Read / Write API Key here'
};

```

## Running
If this is your first time running the example, then the application will first pull all of your people, projects and time entries from Harvest and create them in Hub Planner.

If you have already ran the application once and run it again, the application will pull down all of your data and compare what has been updated since last time by comparing the id's. The application will determine what to create, update and delete based on this.

## Reference
Please see the complete Hub Planner [API Documentation](https://github.com/hubplanner/API) for further reference.

