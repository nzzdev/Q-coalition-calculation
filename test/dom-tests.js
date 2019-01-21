const Lab = require("lab");
const Code = require("code");
const Hapi = require("hapi");
const lab = (exports.lab = Lab.script());
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const expect = Code.expect;
const before = lab.before;
const after = lab.after;
const it = lab.it;

const routes = require("../routes/routes.js");
require("svelte/ssr/register");
const staticTpl = require("../views/HtmlStatic.html");

let server;

before(async () => {
  try {
    server = Hapi.server({
      port: process.env.PORT || 3000,
      routes: {
        cors: true
      }
    });
    server.route(routes);
  } catch (err) {
    expect(err).to.not.exist();
  }
});

after(async () => {
  await server.stop({ timeout: 2000 });
  server = null;
});

function element(markup, selector) {
  return new Promise((resolve, reject) => {
    const dom = new JSDOM(markup);
    resolve(dom.window.document.querySelector(selector));
  });
}

function elementCount(markup, selector) {
  return new Promise((resolve, reject) => {
    const dom = new JSDOM(markup);
    resolve(dom.window.document.querySelectorAll(selector).length);
  });
}

lab.experiment("Q coalition calculation markup check", function() {
  it("should pass if 3 row DOM elements are found", async () => {
    const renderingData = require("../resources/fixtures/data/multiple-coalitions.json");
    var markup = staticTpl.render(JSON.parse(JSON.stringify(renderingData)));

    return elementCount(markup, "div.q-coalition-calculation-row").then(
      value => {
        expect(value).to.be.equal(3);
      }
    );
  });

  it("should pass if 3 description container DOM elements are found", async () => {
    const renderingData = require("../resources/fixtures/data/multiple-coalitions.json");
    var markup = staticTpl.render(JSON.parse(JSON.stringify(renderingData)));

    return elementCount(
      markup,
      "div.q-coalition-calculation-description-container"
    ).then(value => {
      expect(value).to.be.equal(3);
    });
  });

  it("should pass if 6 column DOM elements are found", async () => {
    const renderingData = require("../resources/fixtures/data/multiple-coalitions.json");
    var markup = staticTpl.render(JSON.parse(JSON.stringify(renderingData)));

    return elementCount(markup, "div.q-coalition-calculation-column").then(
      value => {
        expect(value).to.be.equal(6);
      }
    );
  });

  it("should pass if 7 barchart-bar DOM elements are found", async () => {
    const renderingData = require("../resources/fixtures/data/multiple-coalitions.json");
    var markup = staticTpl.render(JSON.parse(JSON.stringify(renderingData)));

    return elementCount(
      markup,
      "div.q-coalition-calculation-barchart-bar"
    ).then(value => {
      expect(value).to.be.equal(7);
    });
  });
});
