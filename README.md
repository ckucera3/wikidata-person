Wikidata Person Querier
===

[![Build Status](https://travis-ci.org/ckucera3/wikidata-person.svg?branch=master)](https://travis-ci.org/ckucera3/wikidata-person)



A JavaScript library for querying `People` using the Wikidata API.

# Installation

## NPM

`npm install wikidata-person`

## Yarn

`yarn add wikidata-person`

# Usage

## Get a Person from Wikipedia


```

var wdp = require('wikidata-person');

wdp.person("Mohandas Karamchand Gandhi", function(person) {
    console.log(person);
});

```

The above code will log:

```
        {
            name:"Mahatma Gandhi",
            description:"pre-eminent leader of Indian nationalism during British-ruled India",
            birthdate: 1869,
            deathdate: 1948
        }
```


## Get an array of Persons from a Wikipedia Category

`require('wikidata-person').category(<category>)` takes in the name of a Wikipedia [Category](https://en.wikipedia.org/wiki/Help:Category) and returns a list of all people who belong to the `<category>` or its subcategories.


```

var wdp = require('wikidata-person');

wdp.category("2nd-century_Roman_usurpers", function(people) {
    console.log(person);
});

```

The above code will log:

```
        [
            {
                name: 'Avidius Cassius',
                description: 'Roman consul',
                birthdate: '+0130',
                deathdate: '+0175'
            },
            {
                name: 'Clodius Albinus',
                description: 'Roman usurper proclaimed emperor by the legions in Britain and Hispania',
                birthdate: '+0150',
                deathdate: '+0197'
            }
        ]
```


### Warnings

If the number of category members exceeds the Wikidata API's `cmlimit`, the returned list of people will not be complete.

Querying a huge category containing a large amount of people (for example, `Category:People`), the query may not complete.


# Tests

`npm test`

# Contributing

In lieu of a formal style guide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code.
