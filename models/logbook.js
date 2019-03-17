const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const LogSchema = new Schema({
  user: Object,
  date: {
    type: Date,
    default: Date.now()
  },
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
  maxHeight: Number,
  type: String,
  techniques: String,
  details: String,
  verified: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("Log", LogSchema);
