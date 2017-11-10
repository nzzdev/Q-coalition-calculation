const Joi = require('joi');
const Enjoi = require('enjoi');
const fs = require('fs');
const resourcesDir = __dirname + '/../../resources/';
const viewsDir     = __dirname + '/../../views/';

const styleHashMap = require(__dirname + `/../../styles/hashMap.json`);

const schemaString = JSON.parse(fs.readFileSync(resourcesDir + 'schema.json', { encoding: 'utf-8'}));
const schema = Enjoi(schemaString);

require('svelte/ssr/register');
const staticTpl = require(`${viewsDir}/HtmlStatic.html`);

module.exports = {
  method: 'POST',
  path:'/rendering-info/html-static',
  config: {
    validate: {
      options: {
        allowUnknown: true
      },
      payload: {
        item: schema,
        toolRuntimeConfig: Joi.object()
      }
    },
    cache: false, // do not send cache control header to let it be added by Q Server
    cors: true
  },
  handler: function(request, h) {

    // gray levels are limited to these specific ones because others are either used or too light
    const defaultGrayLevels = [3, 5, 6, 7, 8, 9];

    // if party has no color we assign a gray level as default
    request.payload.item.parties.map((party, index) => {
      if (!party.color || (!party.color.classAttribute && !party.color.colorCode)) {
        party.color = {
          classAttribute: `s-color-gray-${defaultGrayLevels[index % defaultGrayLevels.length]}`
        }
      }
      return party;
    })

    let data = {
      toolRuntimeConfig: request.payload.toolRuntimeConfig,
      stylesheets: [
        {
          name: styleHashMap.default
        }
      ],
      markup: staticTpl.render(request.payload.item)
    }
    return data;
  }
}
