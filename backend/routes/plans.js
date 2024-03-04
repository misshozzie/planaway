var express = require("express");
var planCtrl = require("../controllers/plans");
var router = express.Router();
var securityMiddleware = require("../middlewares/security");

router.post("/:tripid", securityMiddleware.checkLogin, planCtrl.createPlan);
router.get("/:tripid", securityMiddleware.checkLogin, planCtrl.getAllPlans);
router.get("/:tripid/:planid",securityMiddleware.checkLogin,planCtrl.getOnePlan);
router.patch("/:planid", securityMiddleware.checkLogin, planCtrl.updateOnePlan);
router.delete("/:tripid",securityMiddleware.checkLogin,planCtrl.deleteOnePlan);

module.exports = router;
