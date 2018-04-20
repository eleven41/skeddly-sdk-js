'use strict';

var expect = require('chai').expect;
var assert = require('chai').assert;
var nock = require('nock');

var Skeddly = require('../../index');

describe('#generateAmazonIamRoleExternalId', function() {
    var client = null;

    beforeEach(function() {
        nock('https://api.skeddly.com/api/')
            .get('/credentials/generateAmazonIamRoleExternalId')
            .reply(200, {
                externalId: "skeddly-123456",
                expiryDate: "2018-04-02T00:00:00Z"
            });

        // Create the Skeddly client
        client = Skeddly.createClient({});
    });

    it('should get from /credentials/generateAmazonIamRoleExternalId', function() {
        return client.generateAmazonIamRoleExternalIdAsync()
            .then(function(results) {
                expect(results.externalId).to.equal('skeddly-123456')        
                expect(results.expiryDate).to.equal('2018-04-02T00:00:00Z');    
            });
    });
});