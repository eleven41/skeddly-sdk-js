'use strict';

module.exports = function(client) {
    client.listActionsAsync = function(request) {
        var params = {};

        if (request != null) {
            if (request.filter != null) {
                params.filter = {};

                if (request.filter.actionTypes != null) {
                    params.filter.actionTypes = request.filter.actionTypes.join(',');
                } else if (request.filter.actionType != null) {
                    params.filter.actionTypes = request.filter.actionType;
                }
            }

            if (request.include != null) {
                params.include = request.include.join(',');
            }
        }

        return this.getAsync("/actions/", params);
    };
}