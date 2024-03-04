const tripMdl = require("../models/trips");

module.exports = {
  newTrip,
  getOneTrip,
  getAllTrips,
  updateOneTrip,
  deleteOneTrip,
};

/* === GET ALL TRIPS  === */
async function getAllTrips(req, res) {
  const userName = req.params.username;
  try {
    const tripData = await tripMdl.getAll(userName);
    console.log("Trip is found")
    res.json(tripData);
  } catch (err) {
    console.log(err);
    res.status(500).json({ errMsg: err.message });
  }
}
/* === CREATE NEW TRIP === */
async function newTrip(req, res) {
  const userName = req.params.username;
  const body = req.body;
  try {
    const tripData = await tripMdl.createOne(userName, body);
    res.json(tripData);
  } catch (err) {
    console.log(err);
    res.status(500).json({ errMsg: err.message });
  }
}

/* === DELETE ONE TRIP === */
async function deleteOneTrip(req, res) {
  const userName = req.params.username;
  const tripId = req.query.tripid;
  try {
    const tripData = await tripMdl.deleteOne(userName, tripId);
    res.json(tripData);
  } catch (err) {
    console.log(err);
    res.status(500).json({ errMsg: err.message });
  }
}

/* === GET ONE TRIP === */
async function getOneTrip(req, res) {
  const userName = req.params.username;
  const tripId = req.query.tripid;
  try {
    const tripData = await tripMdl.getOne(userName, tripId);
    res.json(tripData);
  } catch (err) {
    console.log(err);
    res.status(500).json({ errMsg: err.message });
  }
}

/* === UPDATE ONE TRIP === */
async function updateOneTrip(req, res) {
  const userName = req.params.username;
  const tripId = req.query.tripid;
  const body = req.body;
  try {
    const tripData = await tripMdl.updateOne(userName, tripId, body);
    res.json(tripData);
  } catch (err) {
    console.log(err);
    res.status(500).json({ errMsg: err.message });
  }
}
