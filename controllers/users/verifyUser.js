const { User } = require("../../models/user");
const { createHttpError } = require("../../middlewares");

const verifyUser = async (req, res, next) => {
  const { verificationToken } = req.params
  const user = await User.findOne({ verificationToken })
  if (!user) {
    next(createHttpError(404, "User not found"))
  }

  await User.findByIdAndUpdate(user._id, { verify: true, verificationToken: null })
  res.json({
    message: 'Verification successful'
  })
};

module.exports = verifyUser;

