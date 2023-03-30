const { NotFound } = require("http-errors");
const contactOperation = require("../../models/contacts");

const getById = async (req, res) => {
  const { contactId } = req.params;
  const contactById = await contactOperation.getContactById(contactId);

  if (!contactById) {
    throw new NotFound(`Not Found`);
  }
  res.status(200).json(contactById);
};

module.exports = getById;
