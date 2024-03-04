const planMdl = require("../models/plans");

module.exports = {
  createPlan,
  getOnePlan,
  getAllPlans,
  updateOnePlan,
  deleteOnePlan,
};

 /* === CREATE PLAN  === */
async function createPlan(req, res) {
  try {
    const tripID = req.body.tripID;
    const createdTrip = await planMdl.createOne(req.body);
    
    res.status(201).json({ message: 'Trip created successfully', data: createdTrip });
  } catch (error) {
    console.error('Error creating plan:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

/* === GET ONE PLAN === */
async function getOnePlan(req, res) {
  try {
    const planID = req.params.planid;
    const getPlan = await planMdl.findPlanById(planID);
    res.status(200).json(getPlan);
  } catch (error) {
    console.error('Error getting oneplan:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

/* === GET ALL PLANS === */
async function getAllPlans(req, res) {
  try {
    const tripID = req.params.tripid;
    const getTrip = await planMdl.findTripById(tripID);
    const plans =  getTrip.plans 
    res.status(200).json({ Plans: plans });
  } catch (error) {
    console.error('Error getting plans:', error);
    res.status(500).json({ message: 'Internal server error' });
}
}

/* === UPDATE ONE PLAN === */
async function updateOnePlan(req, res) {
  try {
    const planId = req.params.planid; 
    console.log(req.body)
    const updatedPlan = await planMdl.updateOne(planId, req.body);

    if (!updatedPlan) {
      return res.status(404).json({ message: 'Plan not found' });
    }
  
    res.status(200).json({ Plan: updatedPlan });
  } catch (error) {
    console.error('Error updating plans:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

/* === DELETE ONE PLAN === */
async function deleteOnePlan(req, res) {
  try {
    const planID = req.body.planid; 
    const deletedPlan = await planMdl.deleteOne(planID);

    // Send a response indicating that the plan was deleted
    res.status(200).json({ message: 'Plan deleted successfully' });
  } catch (error) {
    console.error('Error deleting plan:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}