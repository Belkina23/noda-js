const contactOperation = require("../../models/contacts");

const getAll = async (req, res) => {
    res.status(200).json(await contactOperation.listContacts());
};

module.exports = getAll;
