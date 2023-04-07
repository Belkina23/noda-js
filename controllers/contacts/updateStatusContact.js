const {Contact} = require("../../models/contacts");
const { NotFound } = require("http-errors");

const updateStatusContact = async (req, res) => {
  const { id } = req.params;
  const updateContact = await Contact.findByIdAndUpdate(id, req.body, {new: true})
  if (!updateContact) {
    throw new NotFound(`Not found`);
  }
  res.status(200).json(updateContact);
};

module.exports = updateStatusContact;

