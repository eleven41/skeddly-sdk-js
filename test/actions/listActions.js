'use strict';

var expect = require('chai').expect;
var assert = require('chai').assert;
var nock = require('nock');

var Skeddly = require('../../index');

describe('#listActions', function() {
    var client = null;

    beforeEach(function() {
        nock('https://api.skeddly.com/api/')
            .get('/actions/')
            .reply(200, [
                {
                    actionType: "amazon-create-ebs-snapshots"
                },
                {
                    actionType: "amazon-create-ebs-snapshot"
                }
            ]);
        nock('https://api.skeddly.com/api/')
            .get('/actions/?filter.actionTypes=amazon-create-ebs-snapshots')
            .reply(200, [
                {
                    actionType: "amazon-create-ebs-snapshots"
                },
                {
                    actionType: "amazon-create-ebs-snapshots"
                }
            ]);

        // Create the Skeddly client
        client = Skeddly.createClient({});
    });

    it('should get from /actions', function() {
        return client.listActions()
            .then(function(results) {
                expect(results).to.be.an('array');
                expect(results.length).to.equal(2);        
            });
    });

    it('should get from /actions?filter.actionTypes=amazon-create-ebs-snapshots', function() {
        return client.listActions({
                filter: {
                    actionType: 'amazon-create-ebs-snapshots'
                }
            })
            .then(function(results) {
                expect(results).to.be.an('array');
                expect(results.length).to.equal(2);

                var actionTypes = [];
                results.forEach(function(e) {
                    actionTypes.push(e.actionType);
                });

                expect(actionTypes).to.contain('amazon-create-ebs-snapshots'); 
                expect(actionTypes).to.not.contain('amazon-create-ebs-snapshot'); 
            });
    });

});