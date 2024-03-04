const { User: userDao, validateUser } = require("../daos/user");
const tripDao = require("../daos/trip");

module.exports = { createOne, getOne, getAll, updateOne, deleteOne };

 /* === GET ALL === */
async function getAll(username) {
  const tripData = await userDao.findOne({ userName: username });
  console.log(tripData);
  const tripDataPopulated = await tripData.populate("trips");
  return tripDataPopulated.trips;
}

 /* === CREATE ONE === */
async function createOne(username, body) {
  const userData = await userDao.findOne({ userName: username });
  const newTrip = await tripDao.create(body);
  userData.trips.push(newTrip);
  const userUpdated = await userData.save();

  return userUpdated;
}

 /* === DELETE ONE === */
async function deleteOne(username, tripId) {
  await userDao.updateOne({ userName: username }, { $pull: { trips: tripId } });
  await tripDao.findByIdAndDelete(tripId);

  const tripDataUpdated = await getAll(username);
  return tripDataUpdated;
}

 /* === GET ONE === */
async function getOne(username, tripId) {
  const tripData = await tripDao.findById(tripId);
  // console.log(tripData);

  return tripData;
}


 /* === UPDATE ONE === */
async function updateOne(username, tripId, body) {
  const tripData = await tripDao.findById(tripId);
  console.log(tripData);
  tripData.destination = body.destination;
  tripData.description = body.description;
  tripData.startDay = body.startDay;
  tripData.endDay = body.endDay;

  await tripData.save();

  return tripData;
}
