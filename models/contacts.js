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
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false }
);

contactSchema.post('create', handleMongooseError);

contactSchema.pre('save', async function (next) {
  const contact = this;
  const existingContact = await Contact.findOne({ 
    $or: [
      { name: contact.name },
      { phone: contact.phone },
      { email: contact.email }
    ]
  });
  if (existingContact) {
    const err = new Error('Name, phone, and email must be unique');
    err.status = 400;
    return next(err);
  }
  next();
});

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
