'use strict';

module.exports = function(client) {
    client.createCredential = function(request) {
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

        return this.post("/credentials/", null, body)
            .then(function(response){
                return {
                    credential: response
                };
            });
    };

    client.modifyCredential = function(request) {
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

        return this.put("/credentials/" + request.credentialId, null, body)
            .then(function(response){
                return {
                    credential: response
                };
            });
    };

    client.deleteCredential = function(request) {
        if (request === undefined) {
            throw "request must be specified";
        }

        if (request.credentialId === undefined) {
            throw "request.credentialId must be specified";
        }

        return this.delete("/credentials/" + request.credentialId, null);
    };

    client.generateAmazonIamRoleExternalId = function(request) {
        return this.get("/credentials/generateAmazonIamRoleExternalId");
    };
};