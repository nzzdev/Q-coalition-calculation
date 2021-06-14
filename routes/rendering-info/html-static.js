const Boom = require("@hapi/boom");
const fs = require("fs");
const resourcesDir = __dirname + "/../../resources/";
const viewsDir = __dirname + "/../../views/";

const styleHashMap = require(__dirname + `/../../styles/hashMap.json`);

const schemaString = JSON.parse(
  fs.readFileSync(resourcesDir + "schema.json", { encoding: "utf-8" })
);

const Ajv = require("ajv");
const ajv = new Ajv({ strict: false });

const validate = ajv.compile(schemaString);

async function validatePayload(payload, options) {
  if (typeof payload !== "object") {
    return Boom.badRequest();
  }
  if (typeof payload.item !== "object") {
    return Boom.badRequest();
  }
  if (typeof payload.toolRuntimeConfig !== "object") {
    return Boom.badRequest();
  }
  try {
    validate(payload.item);
  } catch (err) {
    return Boom.badRequest(JSON.stringify(err));
  }
  return payload;
}

require("svelte/register");
const staticTemplate = require(viewsDir + "App.svelte").default;
module.exports = {
  method: "POST",
  path: "/rendering-info/html-static",
  config: {
    validate: {
      options: {
        allowUnknown: true,
      },
      payload: validatePayload,
    },
    cache: false, // do not send cache control header to let it be added by Q Server
    cors: true,
  },
  handler: function (request, h) {
    // gray levels are limited to these specific ones because others are either used or too light
    const defaultGrayLevels = [4, 5, 6, 7, 8, 9];
    const toolRuntimeConfig = request.payload.toolRuntimeConfig;

    // basic context information
    const context = {
      id: `q_coalition-calculation_${toolRuntimeConfig.requestId}`,
      displayOptions: toolRuntimeConfig.displayOptions || {},
    };

    // if party has no color we assign a gray level as default
    request.payload.item.parties.map((party, index) => {
      if (
        !party.color ||
        (!party.color.classAttribute && !party.color.colorCode)
      ) {
        party.color = {
          classAttribute: `s-color-gray-${
            defaultGrayLevels[index % defaultGrayLevels.length]
          }`,
        };
      }
      return party;
    });

    context.item = request.payload.item
    const staticTemplateRender = staticTemplate.render(context);

    let responseData = {
      toolRuntimeConfig: request.payload.toolRuntimeConfig,
      stylesheets: [
        {
          content: staticTemplateRender.css.code,
        },
        {
          name: styleHashMap.default,
        },
      ],
      markup: staticTemplateRender.html,
    };

    return responseData;
  },
};
