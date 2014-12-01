
var RestClient = require("./client/restClient");
function TimeEntryHandler (hubPlannerConfig) {
    var restClient = new RestClient(hubPlannerConfig, 'timeentry');

    function createOrUpdate (hTimeEntry, hpResource, hpProject, callback) {

        _search(hTimeEntry.id, function (error, timeEntries) {
            if (error || !timeEntries || timeEntries.length > 1) {
                callback(error);
            } else {
                if (timeEntries.length === 1) {
                    //exist lets update
                    _update (hTimeEntry, timeEntries[0], hpResource, hpProject, function (error, updatedTimeEntry) {
                        if (error) {
                            callback(error);
                        } else {
                            console.log("updated timeEntry on: " + updatedTimeEntry.updatedDate)
                            callback();
                        }
                    });
                } else {
                    //add
                    var timeEntry = {};
                    timeEntry.resource = hpResource._id;
                    timeEntry.project = hpProject._id;
                    timeEntry.date = hTimeEntry.spent_at;
                    timeEntry.minutes = hTimeEntry.hours * 60;
                    timeEntry.note = hTimeEntry.notes;
                    timeEntry.metadata = hTimeEntry.id.toString();

                    _create(timeEntry, function (error, addResult) {
                        if (error) {
                            callback(error);
                        } else {
                            console.log("added timeEntry on: ", addResult.date);
                            callback();
                        }
                    });
                }
            }
        });
    }

    function _create (timeEntry, callback) {
        restClient.create(timeEntry, callback);
    }

    function _update (hTimeEntry, hpTimeEntry, hpResource, hpProject, callback) {

        hpTimeEntry.resource = hpResource._id;
        hpTimeEntry.project = hpProject._id;
        hpTimeEntry.date = hTimeEntry.spent_at;
        hpTimeEntry.minutes = hTimeEntry.hours * 60;
        hpTimeEntry.note = hTimeEntry.notes;
        hpTimeEntry.metadata = hTimeEntry.id.toString();

        restClient.update(hpTimeEntry, callback);

    }

    function _search (harvestId, callback) {
        var query = {};
        query.metadata = harvestId.toString();
        restClient.search(query, callback);
    }

    //expose our public method
    this.createOrUpdate = createOrUpdate;
}

module.exports = TimeEntryHandler;