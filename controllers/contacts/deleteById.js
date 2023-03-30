const contactOperation = require("../../models/contacts");

const deleteById = async (req, res) => {
  const { contactId } = req.params;
  const contactDelete = await contactOperation.removeContact(contactId);
  if (!contactDelete) {
    res.status(404).json({
      message: "Not found",
    });
    return;
  }
  res.status(200).json({ message: "contact deleted" });
};

module.exports = deleteById;
