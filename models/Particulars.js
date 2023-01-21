const mongoose = require("mongoose");

const ParticularsSchema = new mongoose.Schema({
  firstparty: {
    type: String,
    required: true,
  },
  firstpartyAdd: {
    type: String,
    required: true,
  },
  secondparty: {
    type: String,
    required: true,
  },
  secondpartyAdd: {
    type: String,
    required: true,
  },
  place: {
    type: String,
    required: true,
  },
  toc: {
    type: String,
    required: true,
  },
  firstpartyroles: {
    type: String,
    required: true,
  },
  secondpartyroles: {
    type: String,
    required: true,
  },
  profitsharing: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
durationFrom: {
    type: Date,
    default: Date.now,
  },
  durationTo: {
    type: Date,
    default: Date.now,
  },
  accountReviewDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Particulars", ParticularsSchema);
