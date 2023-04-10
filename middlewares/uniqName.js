const {Contact} = require('../models/contacts');

const uniqName = async (req, res, next) => {
    const exsistingContact = await Contact.findOne({ name: req.body.name});
    if (exsistingContact) {
        const err = new Error('Name must be unique');
        err.status = 400;
        return next(err);
    }
    next();
}

module.exports = uniqName;