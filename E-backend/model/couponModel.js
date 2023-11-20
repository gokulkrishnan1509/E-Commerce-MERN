const mongoose = require("mongoose");

const couponSchmea = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required field"],
    unique: [true],
    uppercase: [true],
  },
  expiry: {
    type: Date,
    required: [true, "expiry is required field"],
  },
  discount: {
    type: Number,
    required: [true, "discount is required field"],
  },
});

module.exports = mongoose.model("Coupon", couponSchmea);
