var elasticsearch = require('elasticsearch');

var elasticClient = new elasticsearch.Client({
    host: 'http://localhost:9200',
    log:  'info'
});

var indexName = "entities";


// create an entity
module.exports.createEntity = function createEntity( entity, callback ) {
    elasticClient.create({
        index: indexName,
        type:  "entity",
        body:  {
            title:      entity.title,
            entitytype: entity.entitytype,
            suggest:    {
                input:   entity.title.split(" "),
                output:  entity.title,
                payload: entity.metadata || {}
            }
        }
    }).then(function ( resp ) {
        callback(resp);
    }, function ( err ) {
        callback(err.message);
        console.log(err.message);
    });

};

module.exports.getSuggestions = function getSuggestions( input ) {
    return elasticClient.suggest({
        index: indexName,
        type:  "entity",
        body:  {
            suggest: {
                text:       input,
                completion: {
                    field: "suggest",
                    fuzzy: true
                }
            }
        }
    })
};

module.exports.execute = function ( title, type, callback ) {

    if ( (title) && (type) ) {

        elasticClient.search({
            index: indexName,
            type:  'entity',
            body:  {
                query: {
                    bool: {
                        must: [
                            {
                                "wildcard": {

                                    "title": {

                                        "value": "*" + title + "*"

                                    }
                                }

                            },

                            {
                                "wildcard": {

                                    "entitytype": {

                                        "value": "*" + type + "*"

                                    }
                                }

                            }
                        ]

                    }

                }

            }
        }).then(function ( resp ) {
            callback(resp.hits);
        }, function ( err ) {
            callback(err.message);
            console.log(err.message);
        });

    }
    else if ( title ) {
        if ( hasWhiteSpace(title) ) {

            elasticClient.search({
                index: indexName,
                type:  'entity',
                body:  {
                    query: {
                        "match": {
                            "title": {

                                "query":    title,
                                "operator": "and"

                            }
                        }

                    }

                }
            }).then(function ( resp ) {

                callback(resp.hits);
            }, function ( err ) {
                callback(err.message);
                console.log(err.message);
            });

        }
        else {

            elasticClient.search({
                index: indexName,
                type:  'entity',
                body:  {
                    query: {
                        bool: {
                            must: [
                                {
                                    "wildcard": {
                                        "title": {
                                            "value": "*" + title + "*"
                                        }
                                    }
                                }
                            ]
                        }
                    }

                }
            }).then(function ( resp ) {
                callback(resp.hits);
            }, function ( err ) {
                callback(err.message);
                console.log(err.message);
            });

        }
    }
    else if ( type ) {
        if ( hasWhiteSpace(type) ) {

            elasticClient.search({
                index: indexName,
                type:  'entity',
                body:  {
                    query: {
                        "match": {
                            "entitytype": {

                                "query":    type,
                                "operator": "and"

                            }
                        }

                    }

                }
            }).then(function ( resp ) {
                callback(resp.hits);
            }, function ( err ) {
                callback(err.message);
                console.log(err.message);
            });

        } else {
            elasticClient.search({
                index: indexName,
                type:  'entity',
                body:  {
                    query: {
                        bool: {
                            must: [
                                {
                                    "wildcard": {

                                        "entitytype": {

                                            "value": "*" + type + "*"

                                        }
                                    }
                                }
                            ]
                        }

                    }

                }
            }).then(function ( resp ) {
                callback(resp.hits);
            }, function ( err ) {
                callback(err.message);
                console.log(err.message);
            });
        }
    }
    else {
        // get all
        elasticClient.search({
            index: indexName,
            type:  'entity',
            body:  {
                query: {
                    match_all: {}
                }

            }
        }).then(function ( resp ) {
            callback(resp.hits);
        }, function ( err ) {
            callback(err.message);
            console.log(err.message);
        });
    }

    function hasWhiteSpace( s ) {
        return s.indexOf(' ') >= 0;
    }

};