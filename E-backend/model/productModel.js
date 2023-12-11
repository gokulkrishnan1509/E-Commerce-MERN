const mongoose = require("mongoose");

let productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title is required field"],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, "slug is required field"],
      unique: true,
      lowercase: true,
      // index: true, // Index for better query performance
    },
    description: {
      type: String,
      required: [true, "Description is required field"],
    },
    price: {
      type: Number,
      required: [true, "Price is required field"],
    },
    category: {
      type: String,
      required: [true, "Category is required field"],
    },
    brand: {
      type: String,
      //   enum: ["Apple", "Samsung", "Lenovo"],
      required: [true, "Brand is required field"],
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required field"],
    },
    sold: {
      type: Number,
      default: 0,
      // select: false,
    },
    images: [
      {
        public_id: String,
        url: String,
      },
    ],
    tags: String,
    color: [],
    // color: {
    // type: String,
    //   validate: {
    //     validator: function (value) {
    //       return value === "Black" || value === "Brown" || value === "Red";
    //     },
    //   },
    // required: [true, "Color is required field"],
    // },
    ratings: [
      {
        star: Number,
        comment: String,
        "postedby": { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      },
    ],
    totalrating: {
      type: String,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
