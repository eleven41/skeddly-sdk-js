'use strict';

var expect = require('chai').expect;
var assert = require('chai').assert;
var nock = require('nock');

var Skeddly = require('../../index');

describe('#deleteCredential', function() {
    var client = null;

    beforeEach(function() {
        nock('https://api.skeddly.com/api/')
            .delete('/credentials/cred-12345678')
            .reply(200, null);

        // Create the Skeddly client
        client = Skeddly.createClient({});
    });

    it('should delete from /credentials/cred-12345678', function() {
        return client.deleteCredential({
                credentialId: "cred-12345678"
            })
            .then(function(results) {
                expect(results).to.equal('');
            });
    });


});