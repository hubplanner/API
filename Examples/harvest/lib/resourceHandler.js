var RestClient = require("./client/restClient");

/**
 *
 * @param hubPlannerConfig
 * @constructor
 */

function ResourceHandler (hubPlannerConfig) {
    var _restClient = new RestClient(hubPlannerConfig, 'resource');

    /**
     *
     * @returns {RestClient}
     */
    function getClient () {
        return _restClient;
    }

    /**
     *
     * @param harvestPerson
     * @param callback
     */
    function createOrUpdate (harvestPerson, callback) {

        var resource = {};
        resource.firstName = harvestPerson.first_name;
        resource.lastName = harvestPerson.last_name;
        resource.email = harvestPerson.email;
        resource.role = harvestPerson.is_admin ? "ROLE_ADMIN" : "ROLE_TEAM";
        resource.status = harvestPerson.is_active ? "STATUS_ACTIVE" : "STATUS_ARCHIVED";
        resource.metadata = harvestPerson.id.toString();

        _search (harvestPerson.email, function (error, resources) {

            if (error || !resources || resources.length > 1) {
                callback(error);
            } else {

                if (resources.length === 1) {
                    //exist lets update
                    _update (harvestPerson, resources[0], function (error, updatedResource) {
                        if (error) {
                            callback(error);
                        } else {
                            console.log("updated resource: " + updatedResource.email);
                            callback();
                        }
                    });
                } else {
                    //add
                    _create (resource, function (error, addResult) {
                        if (error) {
                            callback(error);
                        } else {
                            console.log("added resource: " + addResult.email);
                            callback();
                        }
                    });
                }
            }
        });
    }

    /**
     *
     * @param resource
     * @param callback
     */
    function _create (resource, callback) {
        _restClient.create(resource, callback);
    }

    /**
     *
     * @param harvestPerson
     * @param hubplannerResource
     * @param callback
     */
    function _update (harvestPerson, hubplannerResource, callback) {
        hubplannerResource.firstName = harvestPerson.first_name;
        hubplannerResource.lastName = harvestPerson.last_name;
        hubplannerResource.metadata = harvestPerson.id.toString();
        hubplannerResource.status = harvestPerson.is_active ? "STATUS_ACTIVE" : "STATUS_ARCHIVED";

        //do not update account owner. API will fail the request.
        if(hubplannerResource.role !== "ROLE_OWNER") {
            hubplannerResource.role = harvestPerson.is_admin ? "ROLE_ADMIN" : "ROLE_TEAM";

            _restClient.update(hubplannerResource, callback);
        } else {
            callback(null, hubplannerResource);
        }
    }

    /**
     *
     * @param email
     * @param callback
     */
    function _search (email, callback) {
        var query = {};
        query.email = email;

        _restClient.search(query, callback);
    }

    //expose our public method
   this.createOrUpdate = createOrUpdate;
   this.getClient = getClient;
}

module.exports = ResourceHandler;