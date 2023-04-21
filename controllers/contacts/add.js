const { Contact } = require("../../models/contacts");

const add = async (req, res, next) => {
  const { _id: owner } = req.user;
  const newContact = await Contact.create({...req.body, owner});
  res.status(201).json(newContact);
};

module.exports = add;
