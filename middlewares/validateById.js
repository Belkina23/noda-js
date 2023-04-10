const mongoose = require("mongoose");
const createHttpError = require("./HttpError");

const validateById = (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    next(createHttpError(404));
  }
  next();
};

module.exports = validateById;
