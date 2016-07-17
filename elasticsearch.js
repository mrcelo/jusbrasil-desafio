var elasticsearch = require('elasticsearch');

var elasticClient = new elasticsearch.Client({
    host: 'localhost:9200',
    log:  'info'
});

var indexName = "entities";
//
// /**
//  * Delete an existing index
//  */
// function deleteIndex() {
//     return elasticClient.indices.delete({
//         index: indexName
//     });
// }
// exports.deleteIndex = deleteIndex;
//
// /**
//  * create the index
//  */
// function initIndex() {
//     return elasticClient.indices.create({
//         index: indexName
//     });
// }
// exports.initIndex = initIndex;
//
// /**
//  * check if the index exists
//  */
// function indexExists() {
//     return elasticClient.indices.exists({
//         index: indexName
//     });
// }
// exports.indexExists = indexExists;
//
// function initMapping() {
//     return elasticClient.indices.putMapping({
//         index: indexName,
//         type:  "entity",
//         body:  {
//             properties: {
//                 title:      { type: "string" },
//                 entitytype: { type: "string" },
//                 suggest:    {
//                     type:            "completion",
//                     analyzer:        "simple",
//                     search_analyzer: "simple",
//                     payloads:        true
//                 }
//             }
//         }
//     });
// }
// exports.initMapping = initMapping;
//
// // addEntity initializes the store; from app.js
// function addEntity( entity ) {
//     return elasticClient.index({
//         index: indexName,
//         type:  "entity",
//         body:  {
//             title:      entity.title,
//             entitytype: entity.entitytype,
//             suggest:    {
//                 input:   entity.title.split(" "),
//                 output:  entity.title,
//                 payload: entity.metadata || {}
//             }
//         }
//     });
// }
// exports.addEntity = addEntity;

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

// module.exports.searchForTitle = function ( searchData, callback ) {
//     elasticClient.search({
//         index: indexName,
//         type:  'entity',
//         body:  {
//             query: {
//                 bool: {
//                     must: [
//                         {
//                             "wildcard": {
//                                 "title": {
//                                     "value": "*" + searchData + "*"
//                                 }
//                             }
//                         }
//                     ]
//                 }
//             }
//
//         }
//     }).then(function ( resp ) {
//         callback(resp.hits);
//     }, function ( err ) {
//         callback(err.message);
//         console.log(err.message);
//     });
// };
//
// module.exports.searchForType = function ( searchData, callback ) {
//     elasticClient.search({
//         index: indexName,
//         type:  'entity',
//         body:  {
//             query: {
//                 bool: {
//                     must: [
//                         {
//                             "wildcard": {
//
//                                 "entitytype": {
//
//                                     "value": "*" + searchData + "*"
//
//                                 }
//                             }
//                         }
//                     ]
//                 }
//
//             }
//
//         }
//     }).then(function ( resp ) {
//         callback(resp.hits);
//     }, function ( err ) {
//         callback(err.message);
//         console.log(err.message);
//     });
// };
//
// module.exports.searchForTypeAndTitle = function ( title, type, callback ) {
//     elasticClient.search({
//         index: indexName,
//         type:  'entity',
//         body:  {
//             query: {
//                 bool: {
//                     must: [
//                         {
//                             "wildcard": {
//
//                                 "title": {
//
//                                     "value": "*" + title + "*"
//
//                                 }
//                             }
//
//                         },
//
//                         {
//                             "wildcard": {
//
//                                 "entitytype": {
//
//                                     "value": "*" + type + "*"
//
//                                 }
//                             }
//
//                         }
//                     ]
//
//                 }
//
//             }
//
//         }
//     }).then(function ( resp ) {
//         callback(resp.hits);
//     }, function ( err ) {
//         callback(err.message);
//         console.log(err.message);
//     });
// };
//
// module.exports.searchPhraseInTitle = function ( searchData, callback ) {
//
//     elasticClient.search({
//         index: indexName,
//         type:  'entity',
//         body:  {
//             query: {
//                 "match": {
//                     "title": {
//
//                         "query":    searchData,
//                         "operator": "and"
//
//                     }
//                 }
//
//             }
//
//         }
//     }).then(function ( resp ) {
//
//         callback(resp.hits);
//     }, function ( err ) {
//         callback(err.message);
//         console.log(err.message);
//     });
// };
// module.exports.searchPhraseInType  = function ( searchData, callback ) {
//
//     elasticClient.search({
//         index: indexName,
//         type:  'entity',
//         body:  {
//             query: {
//                 "match": {
//                     "entitytype": {
//
//                         "query":    searchData,
//                         "operator": "and"
//
//                     }
//                 }
//
//             }
//
//         }
//     }).then(function ( resp ) {
//         callback(resp.hits);
//     }, function ( err ) {
//         callback(err.message);
//         console.log(err.message);
//     });
// };
//
// module.exports.getAll = function ( callback ) {
//     elasticClient.search({
//         index: indexName,
//         type:  'entity',
//         body:  {
//             query: {
//                 match_all: {}
//             }
//
//         }
//     }).then(function ( resp ) {
//         callback(resp.hits);
//     }, function ( err ) {
//         callback(err.message);
//         console.log(err.message);
//     });
// };

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