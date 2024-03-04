/* === USER: CREATE ACCOUNT, LOGIN, UPDATE PROFILE ===*/
const Joi = require("joi");
const bcrypt = require("bcryptjs");
const _ = require("lodash");
const asyncHandler = require("../middlewares/asyncHandler");
const { User, validateUser } = require("../daos/user");

function validateLogin(user) {
  const schema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().required(),
  });

  return schema.validate(user);
}

/* === to update user information === */
function validateUpdateUser(user) {
  const schema = Joi.object({
    password: Joi.string().optional(),
    email: Joi.string().email().optional(),
    userName: Joi.string().optional(),
  });
  return schema.validate(user);
}
/* === to update user information === */
const createUser = asyncHandler(async (req, res) => {
  const { error } = validateUser(req.body.body);

  if (error) {
    return res
      .status(400)
      .send({ status: false, message: error?.details[0]?.message });
  } 

  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res
      .status(400)
      .send({ status: false, message: "Email already exists." });
  } else {
    let newUser = await new User(
      _.pick(req.body, ["userName", "email", "password"])
    ).save();

    if (newUser) {
      return res.status(201).json({
        status: true,
        message: "User created successfully",
        user: newUser,
        //token,
      });
    } else {
      return res.status(400).json({
        status: false,
        message: "Something went wrong",
      });
    }
  }
});

/* === user login === */
const loginUser = asyncHandler(async (req, res) => {
  const { error } = validateLogin(req.body);

  if (error) {
    return res
      .status(400)
      .send({ status: false, message: error?.details[0]?.message });
  }

  let user = await User.findOne({ email: req.body.email });

  if (!user) {
    console.log(1);
    return res
      .status(404)
      .send({ status: false, message: "invalid email or password." });
  }

  const validPassword = await bcrypt.compare(req.body.password, user?.password);
  console.log("🚀 ~ loginUser ~ validPassword:", validPassword);

  if (!validPassword) {
    return res
      .status(404)
      .send({ status: false, message: "Invalid email or password." });
  }

  /* === JWT === */
  const userWithoutPassword = {
    _id: user._id,
    userName: user.userName,
    email: user.email,
    // ~ can add other necessary fields ~
  };

  /*== set a cookie named user + cookies expiration ==*/
  res.cookie("user", userWithoutPassword, {
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });

  return res.header("true", userWithoutPassword).status(200).send({
    status: true,
    message: `Login successfully`,
    user: userWithoutPassword,
    //token, 
  });
});

/* === UPDATE PRFILE === */
const updateUser = asyncHandler(async (req, res) => {
  try {

    let user = await User.findOne({ email: req.body.email, userName: req.body.userName });

    if (!user) {
      return res
        .status(404)
        .send({ status: false, message: "User not found." });
    }
    if (req.body.userName) {
      user.userName = req.body.userName;
    }
    if (req.body.email) {
      user.email = req.body.email;
    }

    if (req.body.password) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      user.password = hashedPassword;
      user.salt = req.body.salt; 
      user.iterations = req.body.iterations;
    }


    await user.save();

    const userWithoutPassword = {
      _id: user._id,
      userName: user.userName,
      email: user.email,
    };
    console.log("USER SAVED")
    return res.status(200).send({
      status: true,
      message: "User updated successfully",
      user: userWithoutPassword,
    });
  } catch (err) {
    console.log(err);
  }
});

/* === LOGOUT === */
const logout = asyncHandler(async (req, res) => {
  res.cookie("user", null).send("Successfully logout");
});

module.exports = { createUser, loginUser, logout, updateUser };
