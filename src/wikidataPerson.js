'use strict';
module.exports = queryWikidataPerson;

var people = require('./PersonHandlerModule.js');
var category = require('./CategoryHandlerModule.js');

function queryWikidataPerson (name, callback) {
	people.init(name, callback);
}

function queryWikidataCategory (name, callback) {

	category.init(name, function(model) {
		var pages = model.pages;
		var entities = [];
		var page;
		page = pages.pop();
		if(page) {
			recursivePersonPageHandler(page);
		} else {
			callback(entities);
		}

		function recursivePersonPageHandler(personPage) {
			people.init(personPage.title, function(entity) {
				if(entity) {
					entities.push(entity);
				}
				var newPage = pages.pop();
				if(newPage) {
					recursivePersonPageHandler(newPage);
				} else {
					callback(entities);
				}
			});
		}
	});
}

module.exports = {
	person: queryWikidataPerson,
	category: queryWikidataCategory
};

