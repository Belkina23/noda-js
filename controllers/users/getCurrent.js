const { createHttpError } = require("../../middlewares");
const { User } = require("../../models/user");

const getCurrent = async (req, res, next) => {
  const { _id } = req.user;

  const user = await User.findById(_id);
  if(!user) {
    next(createHttpError(401))
  }
  const {email, subscription, token} = user;
  if(!token) {
    next(createHttpError(401))
    return;
  }

  res.status(200).json({
    email,
    subscription
  });
};

module.exports = getCurrent;
