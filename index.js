'use strict';

var axios = require('axios');
var Qs = require('qs');

class SkeddlyWebError extends Error {
    constructor(statusCode, errorCode, message) {
        super(message);

        this.errorCode = errorCode;
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
            headers: { 'Authorization': 'AccessKey ' + options.accessKey },

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
            },

            createCredential: function(request) {
                if (request === undefined) {
                    throw "request must be specified";
                }

                var body = {
                    accessKeyId: request.accessKeyId,
                    cloudProviderSubTypeId: request.cloudProviderSubTypeId,
                    credentialType: request.credentialType,
                    externalId: request.externalId,
                    name: request.name,
                    roleArn: request.roleArn,
                    secretAccessKey: request.secretAccessKey
                };

                return this.post("/credentials/", null, body)
                    .then(function(response){
                        return {
                            credential: response
                        };
                    });
            },

            modifyCredential: function(request) {
                if (request === undefined) {
                    throw "request must be specified";
                }

                if (request.credentialId === undefined) {
                    throw "request.credentialId must be specified";
                }

                var body = {
                    accessKeyId: request.accessKeyId,
                    cloudProviderSubTypeId: request.cloudProviderSubTypeId,
                    externalId: request.externalId,
                    name: request.name,
                    roleArn: request.roleArn,
                    secretAccessKey: request.secretAccessKey
                };

                return this.put("/credentials/" + request.credentialId, null, body)
                    .then(function(response){
                        return {
                            credential: response
                        };
                    });
            },

            deleteCredential: function(request) {
                if (request === undefined) {
                    throw "request must be specified";
                }

                if (request.credentialId === undefined) {
                    throw "request.credentialId must be specified";
                }

                return this.delete("/credentials/" + request.credentialId, null);
            },

            generateAmazonIamRoleExternalId: function(request) {
                return this.get("/credentials/generateAmazonIamRoleExternalId");
            },

            listActions: function(request) {
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

                return this.get("/actions/", params);
            }
        };

        return result;
    }
};