'use strict';

var expect = require('chai').expect;
var wdp = require('../src/wikidataPerson');

describe('#wdp', function() {
    it('should retrieve JSON of Emperor Charles V', function() {
        var testPromise = new Promise(function(resolve, reject) {
            wdp('Emperor Charles V', function(result) {
                resolve(result);
            });
        });

        return testPromise.then(function(result){

            expect(JSON.stringify(result)).to.equal(
            JSON.stringify({
                "name": "Charles V",
                "description": "Holy Roman Emperor",
                "birthdate": new Date("1500-12-31T23:59:59.999Z"),
                "deathdate": new Date("1558-12-31T23:59:59.999Z")
            }));
        });
    });

    it('should return undefined', function() {
        var testPromise = new Promise(function(resolve, reject) {
            wdp('123', function(result) {
                resolve(result);
            });
        });

        return testPromise.then(function(result){
            expect(result).to.equal(undefined);
        });
    });

});