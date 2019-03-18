const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: false
  },
  emergencyContact: {
    name: {
      type: String
    },
    phone: {
      type: Number
    }
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  level: {
    type: Number
  },
  resetToken: String,
  resetTokenExpiration: Date,
  hours: {
    log: [
      {
        logbookId: {
          type: Schema.Types.ObjectId,
          ref: "Logbook",
          required: true
        }
      }
    ]
  },
  training: {
    taken: [
      {
        trainingId: {
          type: Schema.Types.ObjectId,
          ref: "Training",
          required: true
        }
      }
    ]
  }
});

module.exports = mongoose.model("User", userSchema);
