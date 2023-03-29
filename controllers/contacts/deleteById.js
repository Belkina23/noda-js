const contactOperation = require("../../models/contacts");
const { NotFound } = require("http-errors");

const deleteById = async (req, res) => {
  const { contactId } = req.params;
  const contactDelete = await contactOperation.removeContact(contactId);
  if (!contactDelete) {
    throw new NotFound(`Not found`);
  }
  res.json({
    status: "success",
    code: 200,
    message: "contact deleted",
    data: {
      result: contactDelete,
    },
  });
};

module.exports = deleteById;
