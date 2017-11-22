const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const JsonSchemaFaker = require('json-schema-faker');
const schema = require('../resources/schema.json');
const expect = require('chai').expect;

// would be nice to do it with json schema faker, but apparently for object "data" 
// the required status is ignored :/
const mockData = require('./resources/mock-data');
require('svelte/ssr/register');
const staticTpl = require('../views/HtmlStatic.html');
var markup = staticTpl.render(mockData);


function element(selector) {
  return new Promise((resolve, reject) => {
    const dom = new JSDOM(markup);
    resolve(dom.window.document.querySelector(selector));
  })
}

function elementCount(selector) {
  return new Promise((resolve, reject) => {
    const dom = new JSDOM(markup);
    resolve(dom.window.document.querySelectorAll(selector).length);
  })
}

// basic tests, could be extended in dependence of mock data
describe('Q coalition calculation markup check', function() {
  
  it('should pass if 4 row DOM elements are found', function() {
    return elementCount('div.q-coalition-calculation-row').then(value => {
      expect(value).to.be.equal(4);
    })
  })

  it('should pass if 4 description container DOM elements are found', function() {
    return elementCount('div.q-coalition-calculation-description-container').then(value => {
      expect(value).to.be.equal(4);
    })
  })
  
  it('should pass if 8 column DOM elements are found', function() {
    return elementCount('div.q-coalition-calculation-column').then(value => {
      expect(value).to.be.equal(8);
    })
  })
  
  it('should pass if 8 barchart-bar DOM elements are found', function() {
    return elementCount('div.q-coalition-calculation-barchart-bar').then(value => {
      expect(value).to.be.equal(8);
    })
  })

})

