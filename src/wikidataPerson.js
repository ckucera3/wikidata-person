'use strict'
module.exports = queryWikidataPerson;

var people = require('./PersonHandlerModule.js');

function queryWikidataPerson (name, callback) {
	people.init(name, callback);
}