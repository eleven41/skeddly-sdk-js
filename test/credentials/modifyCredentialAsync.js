'use strict';

var expect = require('chai').expect;
var assert = require('chai').assert;
var nock = require('nock');

var Skeddly = require('../../index');

describe('#modifyCredential', function() {
    var client = null;

    beforeEach(function() {
        nock('https://api.skeddly.com/api/')
            .put('/credentials/cred-12345678', {
                amazonIamAccessKey: {
                    accessKeyId: "AK123456789012345678",
                    secretAccessKey: "1234567890123456789012345678901234567890"
                },
                cloudProviderSubTypeId: "amazon-standard",
                name: "My Credential"
            })
            .reply(200, {
                "credentialId": "cred-12345678"
            });

        // Create the Skeddly client
        client = Skeddly.createClient({});
    });

    it('should put to /credentials/cred-12345678', function() {
        return client.modifyCredentialAsync({
                amazonIamAccessKey: {
                    accessKeyId: "AK123456789012345678",
                    secretAccessKey: "1234567890123456789012345678901234567890"
                },
                credentialId: "cred-12345678",
                cloudProviderSubTypeId: "amazon-standard",
                name: "My Credential"
            })
            .then(function(results) {
                expect(results.credential.credentialId).to.equal('cred-12345678');
            });
    });


});