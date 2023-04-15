const { createHttpError } = require("../../middlewares");
const { User } = require("../../models/user");

const logOut = async (req, res, next) => {
  const { _id } = req.user;
  const user = await User.findById(_id);
  if (!user || !user.token) {
    next(createHttpError(401));
  }

  await User.findOneAndUpdate({ _id }, { $unset: { token: "" } });
  res.status(204).json();
};

module.exports = logOut;
