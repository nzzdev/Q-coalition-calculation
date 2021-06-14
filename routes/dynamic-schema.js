const Boom = require("@hapi/boom");
const Joi = require("joi");

module.exports = {
  method: "POST",
  path: "/dynamic-schema/{optionName}",
  config: {
    validate: {
      payload: Joi.object(),
    },
    cors: true,
  },
  handler: function (request, h) {
    const item = request.payload.item;
    const optionName = request.params.optionName;

    if (optionName === "availableParties") {
      const partyNames = item.parties.map((p) => p.name);
      const partyIds = item.parties.map((p) => p.id);

      return {
        enum: [null].concat(partyIds),
        "Q:options": {
          enum_titles: [""].concat(partyNames),
        },
      };
    }
    return Boom.badRequest();
  },
};
