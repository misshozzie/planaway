var express = require("express");
var securityMiddleware = require("../middlewares/security");
var tripCtrl = require("../controllers/trips");
var router = express.Router();

router.get(
    "/all/:username",
    securityMiddleware.checkLogin,
    tripCtrl.getAllTrips
);

router.get(
    "/one/:username",
    securityMiddleware.checkLogin,
    tripCtrl.getOneTrip
);

router.post("/:username", securityMiddleware.checkLogin, tripCtrl.newTrip);

router.delete(
  "/:username",
  securityMiddleware.checkLogin,
  tripCtrl.deleteOneTrip
);

router.patch(
  "/:username",
  securityMiddleware.checkLogin,
  tripCtrl.updateOneTrip
);

module.exports = router;
