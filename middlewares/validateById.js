const mongoose = require("mongoose");
const createHttpError = require("./HttpError");

const validateById = (req, res, next) => {
  const { contactId } = req.params;
  if (!mongoose.isValidObjectId(contactId)) {
    next(createHttpError(404));
  }
  next();
};

module.exports = validateById;
