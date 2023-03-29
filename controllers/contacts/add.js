const contactOperation = require("../../models/contacts");


const add = async (req, res) => {
      const newContactAdd = await contactOperation.addContact(req.body);
      res.status(201).json({
      status: "success",
      code: 201,
      data: {
        result: newContactAdd,
      }
      });
  }

  module.exports = add;