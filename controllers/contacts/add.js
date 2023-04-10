const {Contact} = require("../../models/contacts");

const add = async (req, res, next) => {
    const exsistingContact = await Contact.findOne({ name: req.body.name });
    if (exsistingContact) {
      const err = new Error("Name must be unique");
      err.status = 400;
      return next(err);
    }
  const newContactAdd = await Contact.create(req.body);
  res.status(201).json(newContactAdd);
};

module.exports = add;
