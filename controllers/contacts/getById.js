const { Contact } = require("../../models/contacts");
const { createHttpError } = require("../../middlewares");

const getById = async (req, res, next) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  const contactById = await Contact.findById({_id: id, owner});

  if (!contactById) {
    next(createHttpError(404));
  }
  res.status(200).json(contactById);
};

module.exports = getById;
