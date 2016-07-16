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
    "required":   ["title", "entitytype"]

};

// /* GET entities */
// router.get('/', function ( req, res, next ) {
//     elastic.getEntities().then(function ( result ) {
//         res.json(result)
//     });
// });
//
// // // GET specific entity
// router.get('/:q', function ( req, res, next ) {
//     elastic.getEntities(req.params.q).then(function ( result ) {
//         res.json(result)
//     });
// });
//
// /* GET suggestions */
// router.get('/suggest/:input', function ( req, res, next ) {
//     elastic.getSuggestions(req.params.input).then(function ( result ) {
//         res.json(result)
//     });
// });
//
// /* GET search */
// router.get('/search/:input', function ( req, res, next ) {
//     elastic.searchForTitle(req.params.input).then(function ( result ) {
//         res.json(result)
//     });
// });
//
// /* POST document to be indexed */
// router.post('/', function ( req, res, next ) {
//     elastic.addEntity(req.body).then(function ( result ) {
//         res.json(result)
//     });
// });


router.get('/', function ( req, res ) {

    if ( (req.query.q) && (req.query.entitytype) ) {
        searchModule.searchForTypeAndTitle(req.query.q, req.query.entitytype, function ( data ) {
            res.json(data)
        })
    }
    else if ( req.query.q ) {

        searchModule.searchForTitle(req.query.q, function ( data ) {
            res.json(data)

        });
    }

    else if ( req.query.entitytype ) {
        searchModule.searchForType(req.query.entitytype, function ( data ) {
            res.json(data)
        });
    } else {
        searchModule.getAll(function ( resp ) {
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