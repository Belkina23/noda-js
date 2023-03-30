const contactOperation = require("../../models/contacts");

const getAll = async (req, res) => {
  const contacts = await contactOperation.listContacts();
    res.status(200).json({contacts});
};

module.exports = getAll;
