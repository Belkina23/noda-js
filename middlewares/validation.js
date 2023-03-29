const Joi = require("joi");

const validation = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      const { message } = error.details[0];
      return res.status(400).json({ error: message });
    }
    next();
  };
};

// const validation = (schema) => {
//   return (req, res, next) => {
//     const { error } = schema.validate(req.body);
//     if (error) {
//       error.status = 400;
//       next(error);
//     }
//     next();
//   };
// };

module.exports = validation;
