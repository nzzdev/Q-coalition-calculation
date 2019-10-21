const Boom = require("@hapi/boom");
const Joi = require("@hapi/joi");

module.exports = {
  method: "POST",
  path: "/dynamic-enum/{optionName}",
  config: {
    validate: {
      payload: Joi.object()
    },
    cors: true
  },
  handler: function(request, h) {
    const item = request.payload.item;
    if (request.params.optionName === "availableParties") {
      let partyNames = item.parties.map(p => p.name);
      let partyIds = item.parties.map(p => p.id);
      let options = {
        enum: [null].concat(partyIds),
        enum_titles: [""].concat(partyNames)
      };
      return options;
    }
    return Boom.badRequest();
  }
};
