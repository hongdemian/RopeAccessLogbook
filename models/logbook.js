const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const LogSchema = new Schema({
  firstname: String,
  lastname: String,
  user: Object,
  date: {
    type: Date,
    default: Date.now()
  },
  location: String,
  company: String,
  signature: {
    supervisor: String,
    email: String,
    id_num: String,
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
