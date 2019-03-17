const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const logbookSchema = new Schema({
  date: String,
  time: String,
  location: String,
  employer: String,
  signature: {
    supervisor: String,
    email: String,
    id: String,
    organization: String,
    token: String,
    tokenExpiration: Date,
    details: String
  },
  hours: Number,
  maxHeight: String,
  type: String,
  techniques: String,
  details: String,
  verified: Boolean
});

module.exports = mongoose.model("Logbook", logbookSchema);
