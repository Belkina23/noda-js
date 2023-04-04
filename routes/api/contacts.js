const express = require("express");
const router = express.Router();
const { contacts: ctrl } = require("../../controllers");
const { validation, ctrlWrapper } = require("../../middlewares");
const {addContactShema, updateContactShema} = require("../../schemas");


router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:contactId", ctrlWrapper(ctrl.getById));

router.post("/", validation(addContactShema), ctrl.add);

router.delete("/:contactId", ctrlWrapper(ctrl.deleteById));

router.put("/:contactId", validation(updateContactShema), ctrlWrapper(ctrl.updateById));

module.exports = router;
