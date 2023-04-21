const express = require("express");
const router = express.Router();
const { contacts: ctrl } = require("../../controllers");
const { validation, ctrlWrapper } = require("../../middlewares");
const {validateById, authenticate } = require("../../helpers");
const { schemaContacts } = require("../../models/contacts");

router.get("/", authenticate, ctrlWrapper(ctrl.getAll));

router.get("/:id", authenticate, validateById, ctrlWrapper(ctrl.getById));

router.post(
  "/",
  authenticate,
  validation(schemaContacts.add),
  ctrlWrapper(ctrl.add)
);

router.delete("/:id", authenticate, validateById, ctrlWrapper(ctrl.deleteById));

router.put(
  "/:id",
  authenticate,
  validation(schemaContacts.update),
  ctrlWrapper(ctrl.updateById)
);

router.patch(
  "/:id/favorite",
  authenticate,
  validation(schemaContacts.updateStatus),
  ctrlWrapper(ctrl.updateStatusContact)
);

module.exports = router;
