const mongoose = require("mongoose");

const enqSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is a required field"],
  },
  email: {
    type: String,
    required: [true, "Email is a required field"],
    unique: true,
  },
  mobile: {
    type: String,
    required: [true, "Mobile is a required field"],
  },
  comment: {
    type: String,
    required: [true, "Comment is a required field"],
  },
  status: {
    type: String,
    default: "Submitted",
    enum: {
      values: ['Submitted', 'Contacted', 'In Progress'],
      message: 'Status must be one of: Submitted, Contacted, In Progress',
    },
  },
});

const Enquiry = mongoose.model("Enquiry", enqSchema);

module.exports = Enquiry;
