var request = require('request');


var PersonHandlerModule = (function() {

	var init, idInit;

	init = function(title, callback) {
		var model = {};

		lookUpPageId(title, function(id) {
			if(id) {
				lookUpEntity(id, function(entity) {
					entity = createPersonModelFromEntity(entity);
					callback(entity);
				});
			} else {
				callback(undefined);
			}
		})
	};

	idInit = function(id, callback) {
		lookUpEntity(id, function(entity) {
			entity = createPersonModelFromEntity(entity);
			callback(entity);
		});
	}


	function createPersonModelFromEntity(entity) {
		var personModel = {
			name: entity.labels.en.value,
			description: getDescription(entity),
			birthdate: getBirthdate(entity),
			deathdate: getDeathdate(entity)
		};

		if(!getIsHuman(entity) || !personModel.birthdate || !personModel.deathdate || !personModel.name) {
			return undefined;
		}
		return personModel;
	}

	function getIsHuman(entity) {
		if(entity.claims["P31"]) {
			return entity.claims["P31"][0].mainsnak.datavalue.value.id == "Q5";

		}
		return false;
	}

	function getDescription(entity) {
		if(entity.descriptions && entity.descriptions.en && entity.descriptions.en.value) {

			return entity.descriptions.en.value;
		}
		return undefined;
	}

	function getBirthdate(entity) {
		var birthdate = entity.claims["P569"];
		if(birthdate && birthdate[0].mainsnak.datavalue) {
			var dateString = birthdate[0].mainsnak.datavalue.value.time.substring(0, 5);
			return dateString;

		}

		return undefined;

	}

	function getDeathdate(entity) {
		var deathdate = entity.claims["P570"];
		if(deathdate && deathdate[0].mainsnak.datavalue) {
			var dateString = deathdate[0].mainsnak.datavalue.value.time.substring(0, 5);
			return dateString;

		}

		return undefined;

	}


	function getWikidataPageUrl (title) {
		title = title.split(' ').join('_');
		return "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageprops%7Cpageterms&list=&meta=&generator=search&gsrsearch=" + title + "&gsrlimit=1";
	}

	function getWikidataEntityUrl (id) {
		return "https://wikidata.org/w/api.php?action=wbgetentities&format=json&ids=" + id + "&props=labels%7Cdescriptions%7Cclaims&languages=en";
	}

	function lookUpPageId(title, callback) {
		var url = getWikidataPageUrl(title);
		request(url, function(err, response, body) {
		  	if (!err && response.statusCode == 200) {
			  	if(body) {
					body = JSON.parse(body);
					if(body.query) {
						callback(body.query.pages[Object.keys(body.query.pages)[0]].pageprops.wikibase_item);
					} else {
						callback(undefined);
					}
			  	}

			} else {
				callback(undefined);
			}

		});
	}

	function lookUpEntity(id, callback) {
		var url = getWikidataEntityUrl(id);
		request(url, function(err, response, body) {
		  	if (!err && response.statusCode == 200) {
			  	if(body) {
					body = JSON.parse(body);
					var ent = body.entities;
					if(ent) {
						callback(ent[id]);
					} else {
						callback(undefined);
					}
			  	}

			} else {
				callback(undefined);
			}

		});
	}

	return {
		init: init,
		idInit: idInit
	}
})();




module.exports = PersonHandlerModule;
