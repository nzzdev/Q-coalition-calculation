const schema = require("./schema.js");
const stylesheet = require("./stylesheet.js");
const htmlStatic = require("./rendering-info/html-static.js");
const dynamicEnum = require("./dynamic-enum.js");
const health = require("./health.js");
const fixtures = require("./fixtures/data");
const locales = require("./locales.js");

module.exports = schema.concat([
  stylesheet,
  htmlStatic,
  dynamicEnum,
  health,
  locales,
  fixtures
]);
