const { User } = require("../../models/user");
const { createHttpError } = require("../../middlewares");
const { sendEmail } = require("../../helpers");
const { v4: uuidv4 } = require("uuid");

const resendemail = async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    next(createHttpError(400, "missing required field email"));
  }
  if (user.verify) {
    next(createHttpError(400, "Verification has already been passed"));
  }

  const verificationToken = uuidv4();
  await User.findByIdAndUpdate(user._id, { verificationToken });
  await sendEmail({ email, verificationToken });

  res.json({ message: "Verification email sent" });
};

module.exports = resendemail;
