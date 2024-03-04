const utilSecurity = require("../util/security");

module.exports = {
  checkJWT,
  checkLogin,
  checkPermission,
};

function checkJWT(req, res, next) {
  let token = req.get("Authorization") || req.query.token;
  if (token && token.startsWith("Bearer ")) {
    token = token.replace("Bearer ", "");
    try {
      const jwt = utilSecurity.verifyJWT(token);
      req.user = jwt.payload.user; //username
    } catch (err) {
      console.log(err);
      req.user = null;
    }
  }
  console.log(`req.user:`, req.user);
  next();
}

function checkLogin(req, res, next) {
  // Status code of 401 is Unauthorized
  console.log("checklogin", req.user);
  if (!req.user) return res.status(401).json("Unauthorized");
  // A okay
  next();
}

function checkPermission(req, res, next) {
  // Status code of 401 is Unauthorized
  // console.log("check permission", req);
  if (!req.user) return res.status(401).json("Unauthorized");
  if (req.body.email != req.user.email && req.user.is_admin == false)
    return res.status(401).json("Unauthorized");
  next();
}
