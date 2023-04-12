const {Contact} = require("../../models/contacts");

const add = async (req, res, next) => {
  const { name, phone, email } = req.body;
  const existingContact = await Contact.findOne({
  $or: [{ name }, { phone }, { email }],
  });
  
  if (existingContact) {
  const err = new Error("Name, phone, and email must be unique");
  err.status = 400;
  return next(err);
  }
  
  const newContact = await Contact.create(req.body);
  res.status(201).json(newContact);
  };

module.exports = add;


