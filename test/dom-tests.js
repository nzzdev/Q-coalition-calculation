const Lab = require("@hapi/lab");
const Code = require("@hapi/code");
const Hapi = require("@hapi/hapi");
const lab = (exports.lab = Lab.script());
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const expect = Code.expect;
const before = lab.before;
const after = lab.after;
const it = lab.it;

const routes = require("../routes/routes.js");

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

function elements(markup, selector) {
  return new Promise((resolve, reject) => {
    const dom = new JSDOM(markup);
    resolve(dom.window.document.querySelectorAll(selector));
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
    const response = await server.inject({
      url: "/rendering-info/html-static",
      method: "POST",
      payload: {
        item: require("../resources/fixtures/data/multiple-coalitions.json"),
        toolRuntimeConfig: {}
      }
    });

    return elementCount(
      response.result.markup,
      "div.q-coalition-calculation-row"
    ).then(value => {
      expect(value).to.be.equal(3);
    });
  });

  it("should pass if 3 description container DOM elements are found", async () => {
    const response = await server.inject({
      url: "/rendering-info/html-static",
      method: "POST",
      payload: {
        item: require("../resources/fixtures/data/multiple-coalitions.json"),
        toolRuntimeConfig: {}
      }
    });

    return elementCount(
      response.result.markup,
      "div.q-coalition-calculation-description-container"
    ).then(value => {
      expect(value).to.be.equal(3);
    });
  });

  it("should pass if 6 column DOM elements are found", async () => {
    const response = await server.inject({
      url: "/rendering-info/html-static",
      method: "POST",
      payload: {
        item: require("../resources/fixtures/data/multiple-coalitions.json"),
        toolRuntimeConfig: {}
      }
    });

    return elementCount(
      response.result.markup,
      "div.q-coalition-calculation-column"
    ).then(value => {
      expect(value).to.be.equal(6);
    });
  });

  it("should pass if 7 barchart-bar DOM elements are found", async () => {
    const response = await server.inject({
      url: "/rendering-info/html-static",
      method: "POST",
      payload: {
        item: require("../resources/fixtures/data/multiple-coalitions.json"),
        toolRuntimeConfig: {}
      }
    });

    return elementCount(
      response.result.markup,
      "div.q-coalition-calculation-barchart-bar__row"
    ).then(value => {
      expect(value).to.be.equal(7);
    });
  });

  it("should display the colors applied to the coalition", async () => {
    const response = await server.inject({
      url: "/rendering-info/html-static",
      method: "POST",
      payload: {
        item: require("../resources/fixtures/data/single-coalition.json"),
        toolRuntimeConfig: {}
      }
    });

    return elements(
      response.result.markup,
      "div.q-coalition-calculation-column"
    ).then(elements => {
      let coalition = elements[0].querySelectorAll(
        "div.q-coalition-calculation-barchart-bar__row"
      );
      expect(coalition[0].style.backgroundColor).to.be.equals(
        "rgb(240, 162, 0)"
      );
      expect(coalition[0].style.width).to.be.equals("30.00%");
      expect(coalition[1].style.backgroundColor).to.be.equals(
        "rgb(246, 56, 50)"
      );
      expect(coalition[1].style.width).to.be.equals("20.00%");
    });
  });

  it("should display the barchart label in the correct location", async () => {
    const response = await server.inject({
      url: "/rendering-info/html-static",
      method: "POST",
      payload: {
        item: require("../resources/fixtures/data/single-coalition.json"),
        toolRuntimeConfig: {}
      }
    });

    return element(
      response.result.markup,
      "div.q-coalition-calculation-barchart-label"
    ).then(element => {
      expect(element.style.left).to.be.equal("50%");
    });
  });
});
