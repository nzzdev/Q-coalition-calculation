const Joi = require("@hapi/joi");

module.exports = {
  method: "POST",
  path: "/notification/checkNumberSeatExceeded",
  options: {
    validate: {
      options: {
        allowUnknown: true,
      },
      payload: Joi.object().required(),
    },
    cors: true,
    tags: ["api"],
  },
  handler: function (request, h) {
    try {
      const item = request.payload.item;
      // removing the header row first
      const totalSeats = item.parties.reduce(
        (a, b) =>
          (typeof a == "number" ? a : a.seats) +
          (typeof b == "number" ? b : b.seats)
      );

      if (totalSeats <= request.payload.item.totalSeats) {
        return null;
      }
      return {
        message: {
          title: "notifications.checkNumberSeatExceeded.title",
          body: "notifications.checkNumberSeatExceeded.body",
        },
      };
    } catch (err) {
      return null;
    }
  },
};
