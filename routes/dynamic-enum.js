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
      let parties = request.payload.value.parties.map(p => p.name);
      let options = {
        enum: parties,
        enum_titles: parties
      };
      return options;
    }

    return Boom.badRequest();
  }
};
