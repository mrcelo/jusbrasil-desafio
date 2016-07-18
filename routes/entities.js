var express = require('express');
var router  = express.Router();

var searchModule = require('../elasticsearch');

// Ajv is the JSON validator;
// instantiate the validator and define the schema to check against
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

/**
 * Handle GET requests to '/entities/';
 * Search endpoint
 */
router.get('/', function ( req, res ) {

    // decode URI components
    // var query      = decodeURIComponent(req.query.q),
    //     entitytype = decodeURIComponent(req.query.entitytype);
    //
    // console.log("Request query: " + query + "\n" + "Request entitytype: " + entitytype);

    searchModule.execute(req.query.q, req.query.entitytype, function ( data ) {
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