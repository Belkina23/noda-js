const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
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
  const avatarURL = gravatar.url({email});

  const newUser = new User({
    email,
    password: hashPassword,
    subscription,
    avatarURL,
  });
  await newUser.save();
  res.status(201).json({"user":{ email, subscription }});
};

module.exports = singup;
