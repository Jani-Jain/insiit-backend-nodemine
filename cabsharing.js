const mongoose = require("mongoose");

const CabRideSchema = new mongoose.Schema({
  from: { type: String, required: true },
  to: { type: String, required: true },
  rideDateTime: {
    type: Date,
    required : true,
  },
  

  totalSeats: { type: Number, required: true },
  availableSeats: { type: Number, required: true },

  costPerPerson: { type: Number },

  creatorEmail: { type: String, required: true },
  riders: [{ type: String }],

  isClosed: { type: Boolean, default: false },
}, 
{ timestamps: true }
);

module.exports = mongoose.model("CabRide", CabRideSchema);
