/**
 * Created by Marcelo on 7/16/16.
 */
var app = require('../app');
var should = require('should'),
    supertest = require('supertest');
describe('api calls', function () {


    it('should return valid json', function ( done ) {
        supertest(app)
            .get('/entities/')
            .expect(200)
            .end(function ( err, res ) {
                res.status.should.equal(200);
                done();
            });

    });

    it('should create and query a new entity', function(done){

        supertest(app)
            .post('/entities')
            .send({ title: 'Supertested', entitytype: 'test' })
            .end(function ( err, res ) {
                res.status.should.equal(200);
                supertest(app)
                    .get('/entities')
                    .query('q=Supertested&entitytype=test')
                    .end(function ( err, res ) {
                        res.status.should.equal(200);

                    })
            });
        done();

    });


    // it('should not pass', function(done) {
    //     throw "don't pass";
    //     done();
    // })

});