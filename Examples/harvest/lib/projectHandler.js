
var RestClient = require("./client/restClient");
function ProjectHandler (hubPlannerConfig) {
    var _restClient = new RestClient(hubPlannerConfig, 'project');

    /**
     *
     * @returns {RestClient}
     */
    function getClient () {
        return _restClient;
    }

    function createOrUpdate(harvestProject, callback) {
        var project = {};

        project.name = harvestProject.name;
        project.note = harvestProject.notes;
        project.status = harvestProject.active ? "STATUS_ACTIVE" : "STATUS_ARCHIVED";
        project.projectCode = harvestProject.code;
        project.metadata = harvestProject.id.toString();

        _search(harvestProject.id, function (error, projects) {
            if (error || !projects || projects.length > 1) {
                callback(error);
            } else {
                if (projects.length === 1) {
                    //exist lets update
                    _update (harvestProject, projects[0], function (error, updatedProject) {
                        if (error) {
                            callback(error);
                        } else {
                            console.log("updated project: " + updatedProject.name)
                            callback();
                        }
                    });
                } else {
                    //add
                    _create(project, function (error, addResult) {
                        if (error) {
                            callback(error);
                        } else {
                            console.log("added project: " + addResult.name);
                            callback();
                        }
                    });
                }
            }
        });
    }

    function _create (project, callback) {
        _restClient.create(project, callback);
    }

    function _update (harvestProject, hubplannerProject, callback) {

        hubplannerProject.name = harvestProject.name;
        hubplannerProject.note = harvestProject.notes;
        hubplannerProject.status = harvestProject.active ? "STATUS_ACTIVE" : "STATUS_ARCHIVED";
        hubplannerProject.projectCode = harvestProject.code;

        _restClient.update(hubplannerProject, callback);
    }

    function _search(harvestId, callback) {
        var query = {};
        query.metadata = harvestId.toString();
        _restClient.search(query, callback);
    }

    //expose our public method
    this.createOrUpdate = createOrUpdate;
    this.getClient = getClient;
}

module.exports = ProjectHandler;