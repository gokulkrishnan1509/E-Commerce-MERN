const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required field"],
      unique: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("brand",brandSchema)