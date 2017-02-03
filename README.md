Wikidata Person Querier
===

[![Build Status](https://travis-ci.org/ckucera3/wikidata-person.svg?branch=master)](https://travis-ci.org/ckucera3/wikidata-person)



A JavaScript library for querying `People` using the Wikidata API.

# Installation

## NPM

## Yarn

# Usage

```

var wdp = require('wikidata-person');

wdp("Mohandas Karamchand Gandhi", function(person) {
    console.log(person);
    });

    /*
        {
            name:"Mahatma Gandhi",
            description:"pre-eminent leader of Indian nationalism during British-ruled India",
            birthdate: 1869,
            deathdate: 1948
        }
    */

```

## Tests

`npm test`

## Contributing

In lieu of a formal style guide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code.
