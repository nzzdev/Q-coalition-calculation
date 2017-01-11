'use strict';

const Hoek = require('hoek');
const expect = require('chai').expect;
const server = require('../server.js');
const routes = require('../routes/routes.js');

var plugins = [
  require('inert'),
]

server.register(plugins, err => {
  Hoek.assert(!err, err);

  server.route(routes);

  server.start(err => {
    Hoek.assert(!err, err);
  })

});

describe('Q required API', () => {
  
  it('should return 200 for /schema.json', function(done) {
    server.inject('/schema.json', (res) => {
      expect(res.statusCode).to.be.equal(200);
      done();
    });
  })

  it('should return 200 for /stylesheet/default', function(done) {
    server.inject('/stylesheet/default', (res) => {
      expect(res.statusCode).to.be.equal(200);
      done()
    });
  })

  it('should return 404 for inexistent stylesheet', function(done) {
    server.inject('/stylesheet/inexisting', (res) => {
      expect(res.statusCode).to.be.equal(404);
      done()
    });
  })

});

const mockData = require('./resources/mock-data.js');

describe('rendering-info endpoints', () => {
  
  it('should return 200 for /rendering-info/html-static', function(done) {
    const request = {
      method: 'POST',
      url: '/rendering-info/html-static',
      payload: JSON.stringify({item: mockData})
    };
    server.inject(request, (res) => {
      expect(res.statusCode).to.be.equal(200);
      done();
    });
  })

});
