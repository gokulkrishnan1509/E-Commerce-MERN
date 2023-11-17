const mongoose = require("mongoose");

var blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required field"],
    },
    description: {
      type: String,
      required: [true, "description is required field"],
    },
    category: {
      type: String,
      required: [true, "category is requied field"],
    },
    numViews: {
      type: Number,
      default: 0,
    },
    isLiked: {
      type: Boolean,
      default: false,
    },
    isDisLiked: {
      type: Boolean,
      default: false,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    dislikes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    images: {
      type: Array,
    },
    author: {
      type: String,
      default: "Admin",
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
    timestamps: true,
  }
);

module.exports = mongoose.model("Blog", blogSchema);
