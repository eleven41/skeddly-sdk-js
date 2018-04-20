'use strict';

var expect = require('chai').expect;
var assert = require('chai').assert;
var nock = require('nock');

var Skeddly = require('../../index');

describe('#createCredential', function() {
    var client = null;

    beforeEach(function() {
        nock('https://api.skeddly.com/api/')
            .post('/credentials/', {
                amazonIamAccessKey: {
                    accessKeyId: "AK123456789012345678",
                    secretAccessKey: "1234567890123456789012345678901234567890"
                },
                cloudProviderSubTypeId: "amazon-standard",
                credentialType: "amazon-access-key",
                name: "My Credential"
            })
            .reply(200, {
                "credentialId": "cred-12345678"
            });

        // Create the Skeddly client
        client = Skeddly.createClient({});
    });

    it('should post to /credentials/', function() {
        return client.createCredentialAsync({
                amazonIamAccessKey: {
                    accessKeyId: "AK123456789012345678",
                    secretAccessKey: "1234567890123456789012345678901234567890"
                },
                cloudProviderSubTypeId: "amazon-standard",
                credentialType: "amazon-access-key",
                name: "My Credential"
            })
            .then(function(results) {
                expect(results.credential.credentialId).to.equal('cred-12345678');
            });
    });


});