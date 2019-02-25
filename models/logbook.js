const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const logbookSchema = new Schema({
  date: String,
  employer: String,
  details: String,
  location: String,
  typeOfWork: String,
  hours: Number,
  category: String,
  maxHeight: String,
  verified: Boolean,
  signature: {
    name: String,
    email: String,
    phone: Number,
    token: String,
    tokenExpiration: Date,
    details: String
  }
});

module.exports = mongoose.model("Logbook", logbookSchema);
