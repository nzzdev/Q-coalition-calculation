const schema = require("./schema.js");
const stylesheet = require("./stylesheet.js");
const htmlStatic = require("./rendering-info/html-static.js");
const dynamicSchema = require("./dynamic-schema.js");
const health = require("./health.js");
const fixtures = require("./fixtures/data");
const locales = require("./locales.js");
const checkNumberSeatExceeded = require("./notifications/checkNumberSeatExceeded.js");

module.exports = schema.concat([
  stylesheet,
  htmlStatic,
  dynamicSchema,
  health,
  locales,
  fixtures,
  checkNumberSeatExceeded,
]);
