const userMdl = require("../models/users");

module.exports = {
  getUsers,
  getLoginDetails,
  loginUser,
  createUser,
  logoutUser,
  updateUser,
};

async function getUsers(req, res) {
  try {
    const userData = await userMdl.getUsers(req.query);
    res.json({ users: userData });
  } catch (err) {
    res.status(500).json({ errorMsg: err.message });
  }
}

async function getLoginDetails(req, res) {
  try {
    const loginDetails = await userMdl.getLoginDetails(req.query);
    if (loginDetails.success != true) {
      res.status(400).json({ errorMsg: loginDetails.error });
      return;
    }
    res.json(loginDetails.data);
  } catch (err) {
    res.status(500).json({ errorMsg: err.message });
  }
}

async function loginUser(req, res) {
  try {
    const token = await userMdl.loginUser(req.body);
    console.log(token);
    if (!token.success) {
      res.status(400).json({ errorMsg: token.error });
      return;
    }
    res.json(token.data);
  } catch (err) {
    res.status(500).json({ errorMsg: err.message });
  }
}

async function createUser(req, res) {
  try {
    const userData = await userMdl.createUser(req.body);
    res.json(userData);
  } catch (err) {
    console.log(err);
    res.status(500).json({ errorMsg: err.message });
  }
}

async function logoutUser(req, res) {
  try {
    const result = await userMdl.logoutUser(req.body);
    if (!result.success) {
      res.status(400).json({ errorMsg: result.error });
      return;
    }
    res.json(result.data);
  } catch (err) {
    res.status(500).json({ errorMsg: err.message });
  }
}

async function updateUser(req, res) {
  try {
    const userData = await userMdl.updateUser(req.body);
    res.json(userData);
  } catch (err) {
    console.log(err);
    res.status(500).json({ errorMsg: err.message });
  }
}
