const mongoose = require("mongoose");

const MessMenuSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  mess_name: {
    type: String,
    required: true,
  },
  mess: [
    {
      day: { type: Number, required: true },
      breakfast: { type: String, required: true },
      lunch: { type: String, required: true },
      snacks: { type: String, required: true },
      dinner: { type: String, required: true },
    },
  ],
});

module.exports = mongoose.model("MessMenu", MessMenuSchema);
