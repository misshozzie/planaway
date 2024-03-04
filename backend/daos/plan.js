const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const planSchema = new Schema(
  {
    header: { type: String, required: true },
    description: { type: [String] },
    tripID: { type: Schema.Types.ObjectId, ref: "Trip" },
  },
  { timestamps: true }
);

const Plan = mongoose.model("Plan", planSchema);
module.exports = Plan;
