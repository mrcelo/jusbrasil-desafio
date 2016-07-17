var express = require('express');
var router  = express.Router();

var searchModule = require('../elasticsearch');

var Ajv = require('ajv');
var ajv = new Ajv();

var entitySchema = {
    "properties": {
        "title":      {
            "type": "string"
        },
        "entitytype": {
            "type": "string"
        }

    },
    "required":   [ "title", "entitytype" ]

};

function hasWhiteSpace( s ) {
    return s.indexOf(' ') >= 0;
}

// handles GET requests to '/entities/'
// -- search endpoint
router.get('/', function ( req, res ) {

    // decode URI components to get back original query string
    var query      = decodeURIComponent(req.query.q),
        entitytype = decodeURIComponent(req.query.entitytype);

    console.log("Request query: " + query + "\n" + "Request entitytype: " + entitytype);

    // if both the title and entitytype are specified, then searchForTypeAndTitle()
    if ( (req.query.q) && (req.query.entitytype) ) {
        searchModule.searchForTypeAndTitle(query, entitytype, function ( data ) {
            res.json(data)
        });
    }

    // if only title is specified, then search[only]ForTitle()
    else if ( req.query.q ) {


        // if the title has white-space, then search using "match_phrase" query in elasticsearch
        if ( hasWhiteSpace(query) ) {
            searchModule.searchPhraseInTitle(query, function ( data ) {
                res.json(data);
            });
        } else {    // else search as a word query
            searchModule.searchForTitle(query, function ( data ) {
                res.json(data);

            });
        }
    }

    // if only entitytype is specified, then search[only]ForType()
    else if ( req.query.entitytype ) {
        if ( hasWhiteSpace(entitytype) ) {
            searchModule.searchPhraseInType(entitytype, function ( data ) {
                res.json(data);
            });
        }
        searchModule.searchForType(entitytype, function ( data ) {
            res.json(data)
        });
    }

    // if nothing is specified, get all items
    else {
        searchModule.getAll(function ( resp ) {
            res.json(resp);
        })
    }

});

// handle POST requests to '/'
// create entity endpoint
router.post('/', function ( req, res ) {


    // validate request body before adding entities
    var valid = ajv.validate(entitySchema, req.body);
    if ( !valid ) {
        console.log(ajv.errorsText());
        res.json(ajv.errorsText());
    }
    else {
        searchModule.createEntity(req.body, function ( result ) {
            res.json(result);
        });
    }

});

module.exports = router;