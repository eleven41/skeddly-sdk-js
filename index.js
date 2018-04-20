'use strict';

var axios = require('axios');
var Qs = require('qs');

var addActions = require('./clientBuilder/actions');
var addCredentials = require('./clientBuilder/credentials');

class SkeddlyWebError extends Error {
    constructor(statusCode, errorCode, message) {
        super(message);

        this.errorCode = errorCode;
        this.statusCode = statusCode;
    }
};

class SkeddlyAuthorizationError extends Error {
    constructor(statusCode, message) {
        super(message);

        this.statusCode = statusCode;
    }
};

class ParameterValidationFailedError extends SkeddlyWebError {
    constructor(message, modelState) {
        super(403, "ParameterValidationFailed", message);

        this.modelState = modelState;
    }
}

module.exports = {

    createClient: function(options) {

        var isVerbose = options.isVerbose || false;

        if (isVerbose) {
            console.log(options);
        }

        var instance = axios.create({
            baseURL: options.endpoint || 'https://api.skeddly.com/api/',
            timeout: 60000,
            headers: { 'Authorization': 'AccessKey ' + options.accessKeyId },

            paramsSerializer: function(params) {
                
                var result = Qs.stringify(params, {
                    arrayFormat: 'brackets', 
                    allowDots: true
                });
                if (isVerbose) {
                    console.log(result);
                }
                return result;
            }
        });

        var result = {
            instance: instance,

            handleError: function(error) {
                // Bad request
                if (error.response.status == 403) {

                    // Bad parameters
                    if (error.response.data.errorCode == "ParameterValidationFailed") {
                        throw new ParameterValidationFailedError(error.response.data.message, 
                            error.response.data.modelState);
                    }
                } else if (error.response.status == 401) {
                    throw new SkeddlyAuthorizationError(error.response.status, error.response.statusText);
                }

                throw new SkeddlyWebError(error.response.status,
                    error.response.data.errorCode,
                    error.response.data.message,
                );
            },

            get: function(path, params) {
                return this.instance
                    .get(path, {
                        params: params
                    })
                    .then(function(response) {
                        return response.data;
                    })
                    .catch(this.handleError);
            },

            post: function(path, params, data) {
                return this.instance
                    .post(path, data, {
                        params: params
                    })
                    .then(function(response) {
                        return response.data;
                    })
                    .catch(this.handleError);
            },

            put: function(path, params, data) {
                return this.instance
                    .put(path, data, {
                        params: params
                    })
                    .then(function(response) {
                        return response.data;
                    })
                    .catch(this.handleError);
            },

            delete: function(path, params) {
                return this.instance
                    .delete(path, {
                        params: params
                    })
                    .then(function(response) {
                        return response.data;
                    })
                    .catch(this.handleError);
            }
        };

        addActions(result);
        addCredentials(result);

        return result;
    }
};