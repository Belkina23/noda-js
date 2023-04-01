const validation = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
   
    if (error) {
      const errorTypes = error.details[0].type;
      if (errorTypes === 'object.missing') {
        error.status = 400;
        error.message = 'missing fields';
        next(error);
      }
      
    } else {
      next();
    }
  };
};

module.exports = validation;
