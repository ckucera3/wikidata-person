var axios = require('axios');

var CategoryHandlerModule = (function() {

    var init;

    init = function(category, callback) {

        var model = {};
        model.category = category;
        model.url = getWikidataCategoryUrl(category);
        model.prevcats = {};
        getSubcatsAndPagesFromCategory(category, function(subcats, pages) {
            model.subcats = subcats;

            model.pages = pages;
            model.prevcats[category] = true;
            if (model.subcats.length == 0) {
                callback(model);
            } else {
                visitAllCategories(model, function(model) {
                    callback(model);
                });
            }
        });

    };

    function visitAllCategories(model, callback) {
        if(model.subcats.length == 0) {
            callback(model);
        } else {
            var subcat = model.subcats.pop();
            getSubcatsAndPagesFromCategory(subcat.title, recurse);
            function recurse(subsubcats, pages) {

                subsubcats.forEach(function(subsubcat) {
                    if(!model.prevcats[subsubcat.title]) {
                        model.subcats.push(subsubcat);
                    }
                });
                model.pages = model.pages.concat(pages);
                model.prevcats[subcat.title] = true;
                if(model.subcats.length > 0) {
                    subcat = model.subcats.pop();
                    getSubcatsAndPagesFromCategory(subcat.title, recurse);
                } else {
                    callback(model);
                }
            }
        }



    }

    function getWikidataCategoryUrl (category) {
        category = category.split(' ').join('_');
        return "https://en.wikipedia.org/w/api.php?action=query&format=json&list=categorymembers&cmtitle=Category:" + category;
    }

    function getSubcatsAndPagesFromCategory(category, callback) {
        var url = getWikidataCategoryUrl(category);
        var subcats = [];
        var pages = [];


        axios.get(url).then(function(response) {

            if (response.status == 200) {
              var body = response.data;
                if(body) {
                    //body = JSON.parse(body);
                    subcats = subcats.concat(body.query.categorymembers.filter(function(cm) {
                        return (cm.ns == 14);
                    }));

                    pages = pages.concat(body.query.categorymembers.filter(function(cm) {
                        return (cm.ns == 0);
                    }));

                    if(body.continue) {
                        continueRequest(url, body.continue, function(subcats, pages) {
                            callback(subcats, pages);
                        }, subcats, pages);
                    } else {
                        callback(subcats, pages);
                    }

                }
            } else {
                callback(subcats, pages);
            }
        })

    }

    function continueRequest(url, cont, callback, subcats, pages) {
        axios.get(url + "&cmcontinue=" + cont.cmcontinue).then(function(response) {
            body = response.data;

            subcats = subcats.concat(body.query.categorymembers.filter(function(cm) {
                return (cm.ns == 14);
            }));

            pages = pages.concat(body.query.categorymembers.filter(function(cm) {
                return (cm.ns == 0);
            }));

            cont = body.continue;
            if(cont) {
                continueRequest(url, cont, callback, subcats, pages);
            } else {
                callback(subcats, pages)
            }
        });
    }

    return {
        init: init
    }


})();




module.exports = CategoryHandlerModule;
