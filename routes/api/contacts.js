const express = require("express");
const router = express.Router();
const { contacts: ctrl } = require("../../controllers");
const { validation, ctrlWrapper } = require("../../middlewares");
const addContactShema = require("../../schemas");


router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:contactId", ctrlWrapper(ctrl.getById));

router.post("/", ctrl.add);

router.delete("/:contactId", validation(addContactShema), ctrlWrapper(ctrl.deleteById));

router.put("/:contactId", validation(addContactShema), ctrlWrapper(ctrl.updateById));

module.exports = router;
