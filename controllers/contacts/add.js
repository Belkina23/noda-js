const contactOperation = require("../../models/contacts");


const add = async (req, res, next) => {
  try {
    const newContactAdd = await contactOperation.addContact(req.body);
   
    if(!newContactAdd) {
      res.status(400).json({
        "message": "missing required name field"
      });
      return;
    }

    res.status(201).json(newContactAdd);
  } catch (error) {
    next(error)
  }
  
  }

  module.exports = add;