const {Contact} = require("../../models/contacts");
const { createHttpError } = require("../../middlewares");

const updateById = async (req, res, next) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  const updateContact = await Contact.findByIdAndUpdate({_id: id, owner}, req.body, {new: true})
  if (!updateContact) {
    next(createHttpError(404));
    return;
  }
  res.status(200).json(updateContact);
};

module.exports = updateById;
