const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseError } = require("../middlewares");

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: "",
    },
    avatarURL: {
      type: String,
      require: true,
    },
  },
  { versionKey: false }
);

userSchema.post("save", handleMongooseError);

const singupSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().required(),
  subscription: Joi.string()
    .valid("starter", "pro", "business")
    .default("starter"),
}).unknown(false);

const loginSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().min(6).required(),
}).unknown(false);

const subscriptionSchema = Joi.object({
  subscription: Joi.string().required().valid("starter", "pro", "business"),
});

const schemas = {
  singupSchema,
  loginSchema,
  subscriptionSchema,
};

const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
};
