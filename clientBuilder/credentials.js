'use strict';

module.exports = function(client) {
    client.createCredentialAsync = function(request) {
        if (request === undefined) {
            throw "request must be specified";
        }

        var body = {
            amazonIamAccessKey: request.amazonIamAccessKey,
            amazonIamRole: request.amazonIamRole,
            cloudProviderSubTypeId: request.cloudProviderSubTypeId,
            credentialType: request.credentialType,
            name: request.name
        };

        return this.postAsync("/credentials/", null, body)
            .then(function(response){
                return {
                    credential: response
                };
            });
    };

    client.modifyCredentialAsync = function(request) {
        if (request === undefined) {
            throw "request must be specified";
        }

        if (request.credentialId === undefined) {
            throw "request.credentialId must be specified";
        }

        var body = {
            amazonIamAccessKey: request.amazonIamAccessKey,
            amazonIamRole: request.amazonIamRole,
            cloudProviderSubTypeId: request.cloudProviderSubTypeId,
            name: request.name
        };

        return this.putAsync("/credentials/" + request.credentialId, null, body)
            .then(function(response){
                return {
                    credential: response
                };
            });
    };

    client.deleteCredentialAsync = function(request) {
        if (request === undefined) {
            throw "request must be specified";
        }

        if (request.credentialId === undefined) {
            throw "request.credentialId must be specified";
        }

        return this.deleteAsync("/credentials/" + request.credentialId, null);
    };

    client.generateAmazonIamRoleExternalIdAsync = function(request) {
        return this.getAsync("/credentials/generateAmazonIamRoleExternalId");
    };
};