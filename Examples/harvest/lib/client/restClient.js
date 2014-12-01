var superagent   = require('superagent');
var request = superagent.agent();
var apiPath = "/v1/";

function RestClient (hubPlannerConfig, entityPath) {

    function all (callback) {
        request
            .get(hubPlannerConfig.domain + apiPath + entityPath)
            .set({'content-type': hubPlannerConfig.contentType})
            .set({'authorization': hubPlannerConfig.authorization})
            .end(function (error, data) {
                if (error || data.statusCode !== 200) {
                    callback(error || data.error, null);
                } else {
                    callback(null, data.body);
                }
            });
    }

    function create (entity, callback) {
        request
            .post(hubPlannerConfig.domain + apiPath + entityPath).send(entity)
            .set({'content-type': hubPlannerConfig.contentType})
            .set({'authorization': hubPlannerConfig.authorization})
            .end(function (error, data) {
                if (error || data.statusCode !== 201) {
                    callback(error || data.error, null);
                } else {
                    callback(null, data.body);
                }
            });
    }

    function update (entity, callback) {
        request
            .put(hubPlannerConfig.domain + apiPath + entityPath + "/" + entity._id).send(entity)
            .set({'content-type': hubPlannerConfig.contentType})
            .set({'authorization': hubPlannerConfig.authorization})
            .end(function (error, data) {
                if (error || data.statusCode !== 200) {
                    callback(error || data.error, null);
                } else {
                    callback(null, data.body);
                }
            });
    }

    function search (query, callback) {
        request
            .post(hubPlannerConfig.domain + apiPath + entityPath +'/search').send(query)
            .set({'content-type': hubPlannerConfig.contentType})
            .set({'authorization': hubPlannerConfig.authorization})
            .end(function (error, data) {
                if (error || data.statusCode !== 200) {
                    callback(error || data.error, null);
                } else {
                    callback(null, data.body);
                }
            });
    }

    this.all = all;
    this.create = create;
    this.update = update;
    this.search = search;
}

module.exports = RestClient;