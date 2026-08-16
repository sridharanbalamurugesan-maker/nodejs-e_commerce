const joi = require("joi");

const profileDto = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  mobile: joi.string().required(),
  address: joi.string().required(),
});

module.exports = profileDto;
