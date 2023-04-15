const express = require("express");
const router = express.Router();
const { users: ctrl } = require("../../controllers");
const { validation, ctrlWrapper } = require("../../middlewares");
const { authenticate } = require("../../helpers");
const { schemas } = require("../../models/user");


// singup
router.post(
  "/register",
  validation(schemas.singupSchema),
  ctrlWrapper(ctrl.singup)
);

// singin
router.post("/login", validation(schemas.loginSchema), ctrlWrapper(ctrl.login));

// current
router.get("/current", authenticate, ctrlWrapper(ctrl.getCurrent));

// lodout
router.post("/logout", authenticate, ctrlWrapper(ctrl.logOut));

module.exports = router;
