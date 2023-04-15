const bcrypt = require("bcrypt");
const { User } = require("../../models/user");
const { createHttpError } = require("../../middlewares");

const singup = async (req, res, next) => {
  const { subscription, email, password } = req.data;
  const user = await User.findOne({ email });
  if (user) {
    next(createHttpError(409, "Email in use"));
    return;
  }
  const hashPassword = await bcrypt.hash(password, bcrypt.genSaltSync(10));

  const newUser = new User({
    email,
    password: hashPassword,
    subscription,
  });
  await newUser.save();
  res.status(201).json({ newUser: email, subscription });
};

module.exports = singup;
