const {Contact} = require("../../models/contacts");

const getAll = async (req, res) => {
    res.status(200).json(await Contact.find());
};


module.exports = getAll;
