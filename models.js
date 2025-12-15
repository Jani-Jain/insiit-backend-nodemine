const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uuid = require('uuid');


const messMenuSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    mess_name: {
        type: String,
        required: true
    },

    mess: [{
        day: {
            type: Number,
            required: true
        },
        breakfast: {
            type: String,
            required: true
        },
        lunch: {
            type: String,
            required: true
        },
        snacks: {
            type: String,
            required: true
        },
        dinner: {
            type: String,
            required: true
        }
    }]
});

const MessMenu = mongoose.model('MessMenu', messMenuSchema);

module.exports = MessMenu;

//fount item for lost and found
const mongoose = require("mongoose");

const FoundItemSchema = new mongoose.Schema({
  place: { type: String, required: true },
  item: { type: String, required: true },
  remarks: { type: String, default: "-" },
});

const FoundItemDaySchema = new mongoose.Schema({
  date: { type: String, required: true, unique: true }, // YYYY-MM-DD
  items: [FoundItemSchema],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("FoundItemDay", FoundItemDaySchema);
