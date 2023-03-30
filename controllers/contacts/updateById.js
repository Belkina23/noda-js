const contactOperation = require("../../models/contacts");
const { NotFound } = require("http-errors");

const updateById = async (req, res) => {
  const { contactId } = req.params;
  const updateContact = await contactOperation.updateContact(
    contactId,
    req.body
  );
  if (!updateContact) {
    throw new NotFound(`Not found`);
  }
  res.status(200).json(updateContact);
};

module.exports = updateById;
