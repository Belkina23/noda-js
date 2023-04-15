const { Contact } = require("../../models/contacts");

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { favorite, page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;

  const query = { owner };
  if (favorite === 'true') {
    query.favorite = true;
  }
  if (favorite === 'false') {
    query.favorite = false;
  }

  const result = await Contact.find(query, "-createAt", { skip, limit }).sort({ favorite: -1 });
  res.status(200).json(result);
};

module.exports = getAll;
