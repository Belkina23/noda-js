const validation = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      error.status = 400;
      next(error);
    } else if (!req.body) {
      const error = new Error('missing fields');
      error.status = 400;
      next(error);
    } else {
      next();
    }
  };
};

module.exports = validation;
