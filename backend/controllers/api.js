const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require("../daos/user");

module.exports = {
  create,
  login,
  checkToken
};

/* === CHECKTOKEN=== */
function checkToken(req, res) {
  console.log('req.user:', req.user);
  res.json(req.exp);
}

/* === CREATE=== */
async function create(req, res) {
  try {
    const user = await User.create(req.body);
    const token = createJWT(user);
    res.json(token);
  } catch (err) {
    res.status(400).json(err);
  }
}

/* === LOGIN === */
async function login(req, res) {
  try {
    const user = await User.findOne({email: req.body.email});
    if (!user) throw new Error();
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) throw new Error();
    const token = createJWT(user);
    res.json(token);
  } catch (err) {
    res.status(400).json('Bad Credentials');
  }
}

/*--- Helper Functions --*/
function createJWT(user) {
  return jwt.sign(
    // data payload
    { user },
    process.env.SECRET,
    { expiresIn: '24h' }
  );
}