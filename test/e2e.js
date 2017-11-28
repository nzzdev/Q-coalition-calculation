'use strict';

const Hoek = require('hoek');
const expect = require('chai').expect;
const server = require('../server.js');
const plugins = require('../server-plugins.js');
const routes = require('../routes/routes.js');

const start = async function () {

  try {
    await server.register(plugins);
  } catch (err) {
    Hoek.assert(!err, err);
  }
  
  server.route(routes);
  
  try {
    await server.start();
  } catch (err) {
    Hoek.assert(!err, err);
  }
  
  let res;
  describe('Q required API', () => {
    
    it('should return 200 for /schema.json', async function() {
      res = await server.inject('/schema.json');
      return expect(res.statusCode).to.be.equal(200);
    })
  
    it('should return 200 for /stylesheet/default.123.css', async function() {
      res = await server.inject('/stylesheet/default.123.css');
      return expect(res.statusCode).to.be.equal(200);
    });
    
    it('should return 404 for inexistent stylesheet', async function() {
      res = await server.inject('/stylesheet/inexisting.123.css');
      return expect(res.statusCode).to.be.equal(404);
    });

  })
  
  
  const mockData = require('./resources/mock-data.js');
  
  describe('rendering-info endpoints', () => {
    
    it('should return 200 for /rendering-info/html-static', async function() {
      const request = {
        method: 'POST',
        url: '/rendering-info/html-static',
        payload: JSON.stringify({
          item: mockData,
          "toolRuntimeConfig": {
            "displayOptions": {
              "hideTitle": false
            }
          }
        })
      };
      res = await server.inject(request);
      return expect(res.statusCode).to.be.equal(200);
    })
  
  });

}


start()
