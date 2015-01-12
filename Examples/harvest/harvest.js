/**
 *
 * Example app which does load resource, projects and time from Harvest and create them on Hub Planner.
 * All entities will be created once only relying on HP's metadata which can be used to store a reff id from a different system.
 *
 * Important Information before you run this example
 * We advise you to first run this example on a Hub Planner trial account and make sure all data is correctly imported before using your real account. 
 * This example is built using 3rd party applications and modifications of the 3rd party source can break or change the expected result at any given time. 
 *
 * This example might require modifciations to fully function with your account and existing data. 
 * 
 * 
 * What it does. 
 * 
 * 1. Load all people from Harvest account. Search on Hub for same email. If not found create else update. 
 * 2. Load all projects from Harvest account. Search on Hub project.metadata property for Harvest project.id. If found update else crate
 * 3. Load Harvest report for this month. Search on Hub for timeentries.metadata property for Harvest entry.id if found update else create
 */

var async = require('async');
var ResourceHandler = require('./lib/resourceHandler');
var ProjectHandler = require('./lib/projectHandler');
var TimeEntryHandler = require('./lib/timeEntryHandler');
var moment = require("moment");
var _ = require("underscore");



var REQUEST_DELAY = 2000; //ms

//Set to current month.
var reportTimeRange = [moment().startOf('month').format('YYYYMMDD'), moment().endOf('month').format('YYYYMMDD')];

var Harvest = require('harvest')
    , harvest = new Harvest({
        subdomain: "***",
        email: "***",
        password: "***"
    });

//TimeTracking = harvest.TimeTracking;
var Reports = harvest.Reports;
var People = harvest.People;
var Projects = harvest.Projects;

var HubPlannerConfig = {
    domain:"https://api.hubplanner.com",
    contentType: 'application/json',
    authorization: '***'
};

//initiate our handlers
var resourceHandler = new ResourceHandler(HubPlannerConfig);
var projectHandler = new ProjectHandler(HubPlannerConfig);
var timeEntryHandler = new TimeEntryHandler(HubPlannerConfig);

var hubResources;
var hubProjects;

//lets run one job at the time.
async.series([
    function(callback){
        runPeopleJob(callback);
    }, function(callback){
        runProjectsJob(callback);
    }, function(callback){
        getHubPlannerData(callback);
    }, function(callback){
        runTimeEntryJob(callback);
    }
], function(err, result){
    if( err ) {
        // One of the iterations produced an error.
        // All processing will now stop.
        console.log('One job failed to process', err);

    } else {
        console.log('All jobs have been processed successfully');
    }
});

function runPeopleJob(callback) {
    // Load all people from the harvest account
    People.list({}, function(err, response) {
        if (err) return callback(err);
        //loop through each harvest person, if something fails stop process.
        async.eachSeries (response, function (person, callback) {
            setTimeout(function() {
                resourceHandler.createOrUpdate(person.user, callback);
            }, REQUEST_DELAY);
        }, function(err){
            callback(err);
        });
    });
}

function runProjectsJob(callback) {
    // Load all projects from the harvest account
    Projects.list({}, function(err, response) {
        if (err) return callback(err);
        //loop through each harvest project, if something fails stop process.
        async.eachSeries (response, function (item, callback) {
            //we are first trying to locate each harvest project by querying Hub Planner project.metadata == id.
            setTimeout(function() {
                projectHandler.createOrUpdate(item.project, callback);
            }, REQUEST_DELAY);
        }, function(err){
            callback(err);
        });
    });
}

function runTimeEntryJob(callback) {
    Projects.list({}, function(err, response) {
        if (err) return callback(err);
        //loop through each harvest project, if something fails stop process.
        async.eachSeries (response, function (item, callback) {
            setTimeout(function() {
                runReportForProject(item.project, callback);
            }, REQUEST_DELAY);
        }, function(err){
            callback(err);
        });
    });
}

function getHubPlannerData (callback) {
    async.parallel([
        function(callback){
            resourceHandler.getClient().all(callback);
        }, function(callback){
            projectHandler.getClient().all(callback);
        }
    ], function(err, result){
        if( err ) {
            // One of the iterations produced an error.
            // All processing will now stop.
            console.log('getHubPlannerData failed to process', err);
            callback(err);

        } else {
            hubResources = result[0];
            hubProjects = result[1];

            callback(null);
        }
    });
}

function getResource (harvestPersonId) {
    return _.find(hubResources, function (resource) {
        return resource.metadata && resource.metadata == harvestPersonId.toString();
    });
}

function getProject (harvestProjectId) {
    return _.find(hubProjects, function (project) {
        return project.metadata && project.metadata === harvestProjectId.toString();
    });
}

function runReportForProject(project, callback) {
    // Load report from the harvest account
    var query = {};
    query.project_id =  project.id;
    query.from =  reportTimeRange[0];
    query.to =  reportTimeRange[1];

    Reports.timeEntriesByProject(query, function (err, response) {
        if (err) return callback(err);

        async.eachSeries (response, function (item, callback) {
            var hpResource = getResource(item.day_entry.user_id);
            var hpProject = getProject(project.id);

            if(hpResource && hpProject) {
                setTimeout(function() {
                    timeEntryHandler.createOrUpdate(item.day_entry, hpResource, hpProject, callback);
                }, REQUEST_DELAY);
            } else {
                callback("no resource or project found")
            }
        }, function(err){
            callback(err);
        });
    });
}



