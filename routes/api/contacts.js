const express = require("express");
const router = express.Router();
const { contacts: ctrl } = require("../../controllers");
const { validation, ctrlWrapper } = require("../../middlewares");
const validateById = require("../../helpers/validateById");
const { schemaContacts } = require("../../models/contacts");

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:id", validateById, ctrlWrapper(ctrl.getById));

router.post("/", validation(schemaContacts.add), ctrlWrapper(ctrl.add));

router.delete("/:id", validateById, ctrlWrapper(ctrl.deleteById));

router.put(
  "/:id",
  validation(schemaContacts.update),
  ctrlWrapper(ctrl.updateById)
);

router.patch(
  "/:id/favorite",
  validation(schemaContacts.updateStatus),
  ctrlWrapper(ctrl.updateStatusContact)
);

module.exports = router;
