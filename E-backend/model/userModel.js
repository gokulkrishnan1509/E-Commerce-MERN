const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required field"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "email is required field"],
      unique: true,
    },
    mobile: {
      type: Number,
      validate: {
        validator: function (value) {
          const mobileString = value.toString();
          return mobileString.length === 10;
        },
        message: "Mobile should be exactly ten digits",
      },
      required: [true, "mobile is required field"],
    },
    password: {
      type: String,
      required: [true, "password is required field"],
      select: false,
      validate: {
        validator: function (value) {
          return value.length === 10;
        },
        message: "Password should contain 10 characters",
      },
    },
    confirmpassword: {
      type: String,
      validate: {
        validator: function (value) {
          return this.password === value;
        },
        message: "Passwords do not match",
      },
    },
    role: {
      type: String,
      enum: ["user", "admin", "super admin"],
      default: "user",
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    cart: {
      type: Array,
      default: [],
    },
    refreshToken: { type: String },

    // address: [{ type: mongoose.Schema.Types.ObjectId, ref: "Address" }],
    address:{
      type:String
    },
    
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordRestTokenExpired: Date,
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 14);
  this.confirmpassword = undefined;

  next();
});

userSchema.methods.comparePasswordInDb = async function (pwd, pswDB) {
  return await bcrypt.compare(pwd, pswDB);
};

userSchema.methods.isPasswordChange = async function (jwtToken) {
  if (this.passwordChangedAt) {
    const pswdChangedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return jwtToken < pswdChangedTimeStamp;
  } else {
    return false;
  }
};

userSchema.methods.createResetPasswordToken = async function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordRestTokenExpired = Date.now() + 10 * 60 * 1000;

  return resetToken;
};
module.exports = mongoose.model("User", userSchema);
