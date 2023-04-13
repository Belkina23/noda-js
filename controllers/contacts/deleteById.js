const {Contact} = require("../../models/contacts");
const { createHttpError } = require("../../middlewares");

const deleteById = async (req, res, next) => {
  const { id } = req.params;
  const contactDelete = await Contact.findByIdAndDelete(id);
  if (!contactDelete) {
    next(createHttpError(404));
    return;
  }
  res.status(200).json({ message: "contact deleted" });
};

module.exports = deleteById;
