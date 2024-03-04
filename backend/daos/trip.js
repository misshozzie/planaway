const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Plan = require("./plan.js");
const planSchema = Plan.schema;

const tripSchema = new Schema(
  {
    destination: { type: String, required: true },
    startDay: { type: Date, required: true },
    endDay: { type: Date, required: true },
    description: { type: String },
    toShare: { type: Boolean, default: false },
    plans: [planSchema],
  },
  { timestamps: true }
);


module.exports = mongoose.model("Trip", tripSchema);
