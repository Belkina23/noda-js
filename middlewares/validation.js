const validation = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    

    if (error) {
      const errorTypes = error.details[0].type;
      const { key } = error.details[0].context;

      switch (errorTypes) {
        case "object.missing":
          error.status = 400;
          error.message = `missing fields`;
          next(error);
          break;

        case "any.required":
          error.status = 400;
          error.message = `missing required ${key} field`;
          next(error);
          break;

        default:
          break;
      }
    }
    next();
  };
};

module.exports = validation;
