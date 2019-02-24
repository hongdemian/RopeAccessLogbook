const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const trainingSchema = new Schema({
  date: Date,
  name: { type: Object, required: true },
  expires: Date,
  trainer: String,
  notes: String
});

module.exports = mongoose.model("Training", trainingSchema);
