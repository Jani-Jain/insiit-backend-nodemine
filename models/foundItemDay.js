const mongoose = require("mongoose");

const FoundItemSchema = new mongoose.Schema({
  place: String,
  item: String,
  remarks: { type: String, default: "-" },
});

const FoundItemDaySchema = new mongoose.Schema({
  date: { type: String, unique: true },
  items: [FoundItemSchema],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("FoundItemDay", FoundItemDaySchema);
