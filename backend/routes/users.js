// route to handle all user-related operations

var express = require("express");
var userCtrl = require("../controllers/users");
//var securityMiddleware = require("../middlewares/security");

var router = express.Router();

router.get("/login", userCtrl.getLoginDetails);
router.post("/login", userCtrl.loginUser);
router.post("/logout", userCtrl.logoutUser);
router.post("/create", userCtrl.createUser); 
router.patch("/update", userCtrl.updateUser);

module.exports = router;
