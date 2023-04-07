const { NotFound } = require("http-errors");
const {Contact} = require("../../models/contacts");

const getById = async (req, res) => {
  const { id } = req.params;
  const contactById = await Contact.findById(id);

  if (!contactById) {
    throw new NotFound(`Not Found`);
  }
  res.status(200).json(contactById);
};

module.exports = getById;
