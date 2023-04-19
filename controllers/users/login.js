const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../../models/user");
const { createHttpError } = require("../../middlewares");

const { SECRET_KEY } = process.env;

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    next(createHttpError(401, "Email or password is wrong"));
    return;
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    next(createHttpError(401, "Email or password is wrong"));
  }
  const payload = { id: user._id };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, {token})
  const subscription = user.subscription || "starter";

  res.status(201).json({ token, user: {email, subscription} });
};

module.exports = login;
