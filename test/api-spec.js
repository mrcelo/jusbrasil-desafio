/**
 * Created by Marcelo on 7/16/16.
 */
var app     = require('../app'),
    should  = require('should'),
    request = require('supertest');

var APPURL = "http://localhost:3000/entities";

describe('GETting entities', function () {

    it('should return 200 status code', function ( done ) {
        request(app)
            .get('/entities/')
            .expect(200, done)

    });

    it('should return json', function ( done ) {
        request(app)
            .get('/entities')
            .expect('Content-Type', /json/, done);
    });

    it('should return hitchhikers guide', function ( done ) {
        request(app)
            .get('/entities/')
            .query({ q: 'guide galaxy' })
            .expect(/"The Hitchhiker's Guide to the Galaxy"/, done)

    });

    it('should return HTML', function ( done ) {
        request(app)
            .get('/')
            .expect('Content-Type', /html/, done);
    });

});

describe('POSTing entities', function () {
    it("should get a 201 created status", function ( done ) {
        request(app)
            .post('/entities')
            .set('Content-Type', 'application/json')
            .send('{ "title": "test", "entitytype": "test" }')
            .end(function ( err, res ) {
                if ( err ) throw err;
                res.statusCode.should.be.equal(201);
                done();
            })
    });

    it('should not create entity with malformed or missing parameters', function ( done ) {
        request(app)
            .post('/entities')
            .send('{ "tttitle": "test" }')
            .end(function ( err, res ) {
                if ( err ) throw err;
                res.statusCode.should.be.equal(400);
                done();

            })

    });

});
