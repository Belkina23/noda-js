const {Contact} = require("../../models/contacts");

const add = async (req, res, next) => {
  const newContactAdd = await Contact.create(req.body);
  res.status(201).json(newContactAdd);
};

module.exports = add;
