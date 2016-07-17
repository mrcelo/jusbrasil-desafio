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

//
// /* GET suggestions */
// router.get('/suggest/:input', function ( req, res, next ) {
//     elastic.getSuggestions(req.params.input).then(function ( result ) {
//         res.json(result)
//     });
// });
//

router.get('/', function ( req, res ) {
    var query      = decodeURIComponent(req.query.q),
        entitytype = decodeURIComponent(req.query.entitytype);
    console.log("Request query: " + query + "\n" + "Request entitytype:" + entitytype);

    if ( (req.query.q) && (req.query.entitytype) ) {
        searchModule.searchForTypeAndTitle(query, entitytype, function ( data ) {
            res.json(data)
        });
    }
    else if ( req.query.q ) {

        if ( hasWhiteSpace(query) ) {
            searchModule.searchPhraseInTitle(query, function ( data ) {
                res.json(data);
            });
        } else {
            searchModule.searchForTitle(query, function ( data ) {
                res.json(data);

            });
        }
    }

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

    else {
        searchModule.getAll(function ( resp ) {



            // console.log(sources);

            res.json(resp);
        })
    }

});

router.post('/', function ( req, res ) {

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