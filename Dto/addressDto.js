const joi = require("joi");

const addressDto = joi.object({
  fullName: joi.string().required(),
  mobile: joi.string().required(),
  addressLine: joi.string().required(),
  city: joi.string().required(),
  state: joi.string().required(),
  pincode: joi.string().required(),
  isDefault: joi.boolean().optional(),
});

module.exports = addressDto;
