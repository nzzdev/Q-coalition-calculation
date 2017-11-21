const Boom = require('boom');
const Joi = require('joi');

module.exports = {
  method: 'POST',
  path: '/dynamic-enum/{optionName}',
  config: {
    validate: {
      payload: Joi.object()
    },
    cors: true
  },
  handler: function(request, h) {
    if (request.params.optionName === 'availableParties') {
      let partyNames = request.payload.value.parties.map(p => p.name);
      let partyIds = request.payload.value.parties.map(p => p.id);
      let options = {
        enum: [null].concat(partyIds),
        enum_titles: [''].concat(partyNames)
      };
      return options;
    }

    return Boom.badRequest();
  }
};
