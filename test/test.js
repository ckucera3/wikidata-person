'use strict';

var expect = require('chai').expect;
var wdp = require('../src/wikidataPerson');

describe('wdp', function() {

    describe('#personQuery', function() {
        it('should retrieve JSON of Emperor Charles V', function() {
            var testPromise = new Promise(function(resolve, reject) {
                wdp.person('Emperor Charles V', function(result) {
                    resolve(result);
                });
            });

            return testPromise.then(function(result){

                expect(JSON.stringify(result)).to.equal(
                    JSON.stringify({
                        "name":"Charles V, Holy Roman Emperor",
                        "description":"Holy Roman Emperor",
                        "birthdate":"+1500",
                        "deathdate":"+1558",
                        "imageUrl":"https://upload.wikimedia.org/wikipedia/commons/8/89/Titian_-_Portrait_of_Charles_V_Seated_-_WGA22964.jpg"
                    }));
            });
        });

        it('should retrieve JSON of Andres Manuel Lopez Obrador', function() {
            var testPromise = new Promise(function(resolve, reject) {
                wdp.person('Andres Manuel Lopez Obrador', function(result) {
                    resolve(result);
                });
            });

            return testPromise.then(function(result){

                expect(JSON.stringify(result)).to.equal(
                  JSON.stringify({
                    "name":"Andrés Manuel López Obrador",
                    "description":"president of Mexico",
                    "birthdate":"+1953",
                    "twitter": "lopezobrador_",
                    "facebook":"lopezobrador.org.mx",
                    "youtube":"UCxEgOKuI-n-WOJaNcisHvSg",
                    "imageUrl":"https://upload.wikimedia.org/wikipedia/commons/5/5f/LEN%C3%8DN_MORENO_SE_RE%C3%9ANE_CON_EL_L%C3%8DDER_MEXICANO_L%C3%93PEZ_OBRADOR_%2836186836092%29_%28cropped%29.jpg"
                    }));
            });
        });


        it('should return undefined', function() {
            var testPromise = new Promise(function(resolve, reject) {
                wdp.person('123', function(result) {
                    resolve(result);
                });
            });

            return testPromise.then(function(result){
                expect(result).to.equal(undefined);
            });
        });
    });

    describe('#categoryQuery', function() {
        it('should retrieve the entities belonging to the `Category:2nd-century_Roman_usurpers`', function() {
            this.timeout(0);
            var testPromise = new Promise(function(resolve, reject) {
                wdp.category('2nd-century_Roman_usurpers', function(result) {
                    resolve(result);
                });
            });

            return testPromise.then(function(result){

                expect(JSON.stringify(result)).to.equal(
                    JSON.stringify(
                        [{
                            name: "Clodius Albinus",
                            description: "Roman usurper proclaimed emperor by the legions in Britain and Hispania (150-197)",
                            birthdate: "+0150",
                            deathdate: "+0197",
                            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/b/bc/Clodius01_pushkin.jpg"
                        },
                        {
                            name: "Avidius Cassius",
                            description: "Roman general and usurper (c.130-175)",
                            birthdate: "+0130",
                            deathdate: "+0175",
                            imageUrl: ""
                        }
                        ]
                    ));
            });
        });

    })



});
