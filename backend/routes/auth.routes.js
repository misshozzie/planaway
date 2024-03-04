/* === AUTHENTICATION ROUTES ===*/
const express = require("express");
const {
  createUser,
  loginUser,
  logout,
  updateUser,
} = require("../controllers/auth");
//const checkToken = require("../middlewares/checkToken");

const authRoutes = express.Router();

authRoutes.post("/register", createUser);
authRoutes.post("/login", loginUser);
authRoutes.post("/logout", logout);
authRoutes.put("/update", updateUser);

module.exports = authRoutes;
