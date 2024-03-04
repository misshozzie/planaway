const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");

const UserSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    salt: {
      type: String,
    },
    iterations: {
      type: Number,
    },
    token: {
      type: String,
    },
    expire_at: {
      type: Number,
    },
    accountType: { type: String, enum: ["basic", "premium"], default: "basic" },
    trips: [{ type: Schema.Types.ObjectId, ref: "Trip" }],
  },
  { timestamps: true }
);

function validateUser(user) {
  const schema = Joi.object({
    userName: Joi.string().required(),
    password: Joi.string().required(),
    email: Joi.string().required().email(),
    salt: Joi.string().required(),
    iterations: Joi.number().required(),
  });

  return schema.validate(user);
}

const User = mongoose.model("User", UserSchema);

module.exports = { User, validateUser };
