var express = require('express');
var router  = express.Router();

var searchModule = require('../elasticsearch');

// Ajv is the JSON validator;
// instantiate the validator and define the schema to check against
var Ajv          = require('ajv');
var ajv          = new Ajv();
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

/**
 * Handle GET requests to '/entities/';
 * Search endpoint
 */
//
//
router.get('/suggest/', function ( req, res ) {
    console.log(req.query.q);
    searchModule.getSuggestions(req.query.q).then(function ( result ) {
        if ( result ) {

            var resultsarray = result.suggest[ 0 ].options;
            res.json(resultsarray);
        }
    });
});
router.get('/', function ( req, res ) {

    var q = req.query.q, type = req.query.type;

    // Normalize to lowercase to optimize for elasticsearch analyzer
    if ( q ) {
        q = q.toLowerCase();
    }
    if ( type ) {
        type = type.toLowerCase();
    }

    searchModule.execute(q, type, function ( data ) {
        res.json(data);
    });

});

/**
 * Handle POST requests to '/entities'
 * createEntity endpoint
 */
router.post('/', function ( req, res ) {


    // validate request body before adding entities
    var valid = ajv.validate(entitySchema, req.body);
    if ( !valid ) {
        console.log(ajv.errorsText());
        res.status(400);
        res.json(ajv.errorsText());
    }
    else {
        searchModule.createEntity(req.body, function ( result ) {
            res.status(201);
            res.json(result);
        });
    }

});

module.exports = router;