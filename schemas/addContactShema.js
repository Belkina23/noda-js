const Joi = require("joi");

const addContactShema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().required(),
  email: Joi.string().required(),
});

const updateContactShema = Joi.object({
  name: Joi.string(),
  phone: Joi.string(),
  email: Joi.string(),
}).or("name", "phone", "email");

module.exports = { addContactShema, updateContactShema };
