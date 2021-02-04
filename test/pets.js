var mongoose = require('mongoose')
chai = require('chai'),
chaiHTTP = require('chai-http');
chai.use(chaiHTTP);
chai.config.includeStack = true;

var should = chai.should()
var assert = chai.assert
var expect = chai.expect;

var app = require('../index'),

Pets = require('../models/pets');

describe('Describe Pets test', function()
{
    Pets.collection.drop();
    
	beforeEach(function(done) {
		var newData = new Pets( {
			name: 'shesh test',
			age: 12,
			color: 'Red',
        });
        newData.save(function(err) {
            done();
        });
    });
	afterEach(function(done) {
		Pets.collection.drop();
		done();
	});


    it('should list all pets on /pets GET', function(done) {
        chai.request(app)
        .get('/pets')
        .end(function(err, res){

            res.should.have.status(200);
            res.should.be.json; 

            res.body.should.be.a('array');
            res.body[0].should.have.property('_id');

            expect(res.body[0]).to.have.property('name');
            expect(res.body[0].name).to.be.a('string');
            res.body[0].name.should.equal('shesh test');

            expect(res.body[0]).to.have.property('age');
            expect(res.body[0].age).to.be.a('number');
            res.body[0].age.should.equal(12);

            expect(res.body[0]).to.have.property('color');
            expect(res.body[0].color).to.be.a('string');
            res.body[0].color.should.equal('Red');
        
            done();
        
        });
    });


    it('should add a pets on /pets/create POST', function(done) {
        chai.request(app)
        .post('/pets/create')
        .send({'name':'Hello Shesh','age':15,'color':'Green'})
        .end(function(err, res){

            res.should.have.status(200);
            res.should.be.json;
            
            res.body.should.be.a('object');
            res.body.should.have.property('data');
            
            res.body.data.should.be.a('object');
            res.body.data.should.have.property('_id');
            res.body.data.should.have.property('name');
            res.body.data.should.have.property('age');
            res.body.data.should.have.property('color');
            expect(res.body.data.name).to.equal('Hello Shesh');
            expect(res.body.data.age).to.equal(15);
            expect(res.body.data.color).to.equal('Green');
            
            done();
        });
    });


    it('should delete a pets on /pets/<id> DELETE', function(done) {
        chai.request(app)
        .get('/pets')
        .end(function(err, res){
            chai.request(app)
            .delete('/pets/'+res.body[0]._id)
            .end(function(error, response){
                should.not.exist(error);
                response.should.have.status(200);
                response.should.be.json;
                response.body.should.be.an('object');
                done();
            });
        });
    });  	

})