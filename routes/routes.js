const schema = require('./schema.js')
const stylesheet = require('./stylesheet.js')
const htmlStatic = require('./rendering-info/html-static.js')
const dynamicEnum = require('./dynamic-enum.js')

module.exports = schema.concat([
  stylesheet,
  htmlStatic,
  dynamicEnum
])
