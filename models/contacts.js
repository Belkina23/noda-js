const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseError } = require("../middlewares");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false }
);

contactSchema.post("save", handleMongooseError);

const add = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().required(),
  email: Joi.string().required(),
  favorite: Joi.boolean(),
}).unknown(false);

const update = Joi.object({
  name: Joi.string(),
  phone: Joi.string(),
  email: Joi.string(),
})
  .or("name", "phone", "email")
  .unknown(false);

const updateStatus = Joi.object({
  favorite: Joi.boolean().required(),
}).unknown(false);

const Contact = model("contact", contactSchema);

const schemaContacts = {
  add,
  update,
  updateStatus,
};

module.exports = { Contact, schemaContacts };
