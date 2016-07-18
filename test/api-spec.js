/**
 * Created by Marcelo on 7/16/16.
 */
var app       = require('../app'),
    should    = require('should'),
    supertest = require('supertest');

var APPURL = "http://localhost:3000/entities";

// .post('/entities')
//     .send({ title: 'Supertested', entitytype: 'test' })
//     .end(function ( err, res ) {
//         res.status.should.equal(200);
//         supertest(app)
//             .get('/entities')
//             .query('q=z')
//             .end(function ( err, res ) {
//                 // res.body.total.should.notEqual(0);
//                 assert.notEqual(0, res.body.total);
//
//                 done();
//             })
//     });
// it('should not pass', function(done) {
//     throw "don't pass";
//     done();
// })

describe('GETting information', function () {

    it('should return 200 status code', function ( done ) {
        supertest(app)
            .get('/entities/')
            .expect(200, done)

    });

    it('should return valid json', function ( done ) {
        supertest(app)
            .get('/entities')
            .expect('Content-Type', /json/, done);
    });

    it('should return hitchhikers guide', function ( done ) {
        supertest(app)
            .get('/entities/?q=guide%20galaxy')
            .expect(/"The Hitchhiker's Guide to the Galaxy"/, done)

    });

    it('should return HTML', function ( done ) {
        supertest(app)
            .get('/')
            .expect('Content-Type', /html/, done);
    });

});

describe('POSTing entities', function () {
    it("should get a 201 created status", function () {
        supertest(app)
            .post('/entities')
            .send({ title: 'test', entitytype: 'test' })
            .end(function ( err, res ) {
                if ( err ) throw err;
                res.status.should.be.equal(201);

            })
    });

});
