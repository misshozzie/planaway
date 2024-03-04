const Plan = require("../daos/plan");
const Trip = require("../daos/trip");

module.exports = { 
    findTripById, 
    createOne,
    findPlanById, 
    deleteOne,
    updateOne, 
 };

 /* === CREATE ONE PLAN === */
async function createOne(plans) {
    try {

        const newPlan = await Plan.create({
            header: plans.header,
            description: plans.description,
            tripID: plans.tripID,
          });

        const trip = await Trip.findById(plans.tripID);
        if (!trip) {
            throw new Error('Trip not found'); 
        }

        trip.plans.push(newPlan);
        await trip.save();

        console.log("Plan created:", newPlan);
        return newPlan;
    } catch (error) {
        console.error("Error creating plan:", error);
    }
  }

   /* === FIND TRIP BY ID === */
async function findTripById(tripID) {
try {
    const trip = await Trip.findById(tripID);

    if (!trip) {
    throw new Error('Trip not found');
    }

    return trip;
} catch (error) {
    throw error; 
}
}

 /* === FIND PLAN BY ID === */
async function findPlanById(planID) {
    try {
        const plan = await Plan.findById(planID);
        if (!plan) {
        throw new Error('Plan not found');
        }
        return plan;
    } catch (error) {
        throw error; 
    }
    }

/* === UPDATE ONE PLAN === */  
async function updateOne(planId, data) {
    try {
        const planID = planId;
        const updateData = {
            header: data.header,
            description: data.description,
          };
      
        const updatedPlan = await Plan.findOneAndUpdate({ _id: planID }, updateData, { new: true });
          if (!updatedPlan) {
            throw new Error('Plan not found');
        }

        const trip = await Trip.findOne({ "plans._id": planID });

        if (trip) {
          const planIndex = trip.plans.findIndex((plan) => plan._id.toString() === planID.toString());
          if (planIndex !== -1) {
            trip.plans[planIndex].header = data.header;
            trip.plans[planIndex].description = data.description;
            await trip.save();
          } else {
            throw new Error('Plan not found in Trip');
          }
        } else {
          throw new Error('Trip not found for the updated plan');
        }

        return updatedPlan;
    } catch (error) {
        throw error; 
    }
}

/* === DELETE ONE PLAN === */  
async function deleteOne(planID) {
    try {

      const deletedPlan = await Plan.findByIdAndDelete(planID);
      if (!deletedPlan) {
        throw new Error('Plan not found in model');
      }
  
      const trip = await Trip.findOne({ "plans._id": planID });
  
      if (trip) {
        trip.plans.pull(planID);
        await trip.save();
      } else {
        console.error('Trip not found for the deleted plan');
      }
  
      return deletedPlan;
    } catch (error) {
      throw error;
    }
  }
  