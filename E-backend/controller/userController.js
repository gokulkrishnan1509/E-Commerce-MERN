// ******************Third party library**************

const uniqueId = require("uniqid");
const jwt = require("jsonwebtoken");

const { default: mongoose } = require("mongoose");

// **********Node Modules *******************************
const util = require("util");
const crypto = require("crypto");

// ****************UTILS FILES**************************
const sendEmail = require("../utils/sendEmail");
const validateMongoDbId = require("../utils/validateMongooseId");
const { generateRefreshToken } = require("../utils/refreshToken");
const CustomError = require("../utils/customError");
const asyncErrorHanlder = require("../utils/asyncErrorHandler");

// *********************MODELS************************************
const productModel = require("../model/productModel");
const cartModel = require("../model/cartModel");
const couponModel = require("../model/couponModel");
const userModel = require("../model/userModel");
const orderModel = require("../model/orderModel");

// ********************Generate Token*********************************

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.SECERET_STRING, {
    expiresIn: process.env.EXPIRE_DAYS,
  });
};

const allowedRoles = ["admin", "super admin"];

// ***********************************************************************

exports.createUser = asyncErrorHanlder(async (req, res, next) => {
  try {
    const user = await userModel.create(req.body);

    const token = generateToken(user._id);

    res.status(201).json({ status: "success", data: { user }, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
// ***********************************************************************

exports.login = asyncErrorHanlder(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    const error = new CustomError(
      "please provide email & password for login",
      400
    );
    return next(error);
  }

  const user = await userModel.findOne({ email }).select("+password");
  const isMatch = await user.comparePasswordInDb(password, user.password);
  if (!user || !isMatch) {
    const error = new CustomError("incorrect email or password", 400);
    return next(error);
  } else {
    const refreshToken = await generateRefreshToken(user?._id);
    await userModel.findByIdAndUpdate(
      user._id,
      { refreshToken: refreshToken },
      { new: true }
    );

    // saving in the cookie storage

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000, // it only available for 72 hours
    });
  }
  const token = generateToken(user._id);

  res.status(200).json({
    _id: user?._id,
    name: user?.name,
    email: user?.email,
    mobile: user?.mobile,
    token,
  });
});
// ***********************************************************************

exports.adminLogin = asyncErrorHanlder(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    const error = new CustomError(
      "please provide email & password for login",
      400
    );

    return next(error);
  }

  const adminUser = await userModel.findOne({ email }).select("+password");
  if (!allowedRoles.includes(adminUser.role)) {
    const error = new CustomError("Not Authorised", 403);
    return next(error);
  }
  const isMatch = await adminUser.comparePasswordInDb(
    password,
    adminUser.password
  );

  if (!adminUser || !isMatch) {
    const error = new CustomError("incorrect email or password", 400);
    return next(error);
  } else {
    const refreshToken = await generateRefreshToken(adminUser?._id);
    await userModel.findByIdAndUpdate(
      adminUser._id,
      { refreshToken: refreshToken },
      { new: true }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });
  }

  const token = generateToken(adminUser._id);

  res.status(200).json({
    _id: adminUser?._id,
    name: adminUser?.name,
    email: adminUser?.email,
    mobile: adminUser?.mobile,
    token,
  });
});

// ***********************************************************************

exports.logout = asyncErrorHanlder(async (req, res, next) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) {
    const error = new CustomError("No Refresh Token in Cookies");
    return next(error);
  }
  const refreshToken = cookie.refreshToken;
  const user = await userModel.findOne({ refreshToken });
  if (!user) {
    res.clearCookie("refreshToken", { httpOnly: true, secure: true });
    return res.status(204).send();
  }

  await userModel.findOneAndUpdate(
    { refreshToken },
    {
      refreshToken: "",
    }
  );
  res.clearCookie("refreshToken", { httpOnly: true, secure: true });

  return res.status(204).send();
});

// ***********************************************************************
exports.handleRefreshToken = asyncErrorHanlder(async (req, res, next) => {
  const cookie = req.cookies;

  if (!cookie?.refreshToken) {
    return res.status(401).json({ error: "No Refresh Token in Cookies" });
  }

  const refreshToken = cookie.refreshToken;

  const user = await userModel.findOne({ refreshToken: refreshToken });
  if (!user) {
    return res.status(401).json({
      error: "No refresh token present in the database or not matched",
    });
  }

  const decodedToken = await util.promisify(jwt.verify)(
    refreshToken,
    process.env.SECERET_STRING
  );

  if (user._id !== decodedToken.id) {
    const error = new CustomError("error occured", 400);
    return next(error);
  }

  const accesstoken = generateToken(user?._id);
  res.json({ accesstoken });
});

// ***********************************************************************

exports.forgotPassword = asyncErrorHanlder(async (req, res, next) => {
  const { email } = req.body;
  const findUser = await userModel.findOne({ email });
  if (!findUser) {
    return next(
      new CustomError(` we could not find the user email with given email`, 404)
    );
  }

  const resetToken = await findUser.createResetPasswordToken();
  await findUser.save({ validateBeforeSave: false });

  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/user/resetpassword/${resetToken}`;
  const message = `we have received a password reset request. please use below link to reset you password\n\n${resetUrl}\n\n this link vald for 10 minutes`;
  try {
    await sendEmail({
      email: findUser.email,
      subject: "password change request received",
      message: message,
    });
    res.status(200).json({
      status: "success",
      message: "password reset link send to the user email",
    });
  } catch (error) {
    findUser.passwordResetToken = undefined;
    findUser.passwordRestTokenExpired = undefined;
    findUser.save({ validateBeforeSave: false });

    return next(
      new CustomError(`there was an error sending password reset email`, 500)
    );
  }
});

// ***********************************************************************

exports.resetPassword = asyncErrorHanlder(async (req, res, next) => {
  const token = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  const update = await userModel.findOne({
    passwordResetToken: token,
    passwordRestTokenExpired: { $gt: Date.now() },
  });

  if (!update) {
    const error = new CustomError("token is invalid or has expired !", 400);
    return next(error);
  }

  update.password = req.body.password;
  update.confirmpassword = req.body.confirmpassword;
  update.passwordResetToken = undefined;
  update.passwordRestTokenExpired = undefined;
  update.passwordChangedAt = Date.now();
  update.save();

  const jwttoken = generateToken(update._id);
  res.status(200).json({ status: "success", jwttoken });
});

// ***********************************************************************

exports.protect = asyncErrorHanlder(async (req, res, next) => {
  const testToken = req.headers.authorization;
  let token;
  if (testToken && testToken.startsWith("Bearer")) {
    token = testToken.split(" ")[1];
  }

  if (!token) {
    const error = new CustomError("you are not logged in", 401);
    return next(error);
  }

  const decodedToken = await util.promisify(jwt.verify)(
    token,
    process.env.SECERET_STRING
  );
  const user = await userModel.findById(decodedToken.id);

  if (!user) {
    const error = new CustomError(
      `the user with give token does not exist`,
      401
    );
    return next(error);
  }

  // if the user changed password after token was issued
  if (await user.isPasswordChange(decodedToken.iat)) {
    const error = new CustomError(
      `the password has been changed recently. please login again`,
      401
    );
    return next(error);
  }

  // 5. allow user to access route
  req.user = user;

  next();
});

// ***********************************************************************
exports.restrict = (...role) => {
  return (req, res, next) => {
    if (!role.includes(req.user.role)) {
      const error = new CustomError(
        "you do have permission to perform this action",
        403
      );
      return next(error);
    }
    next();
  };
};
// exports.restrict = (role) => {
//   return (req, res, next) => {
//     if (req.user.role !== role) {
//       const error = new CustomError(
//         "you do have permission to perform this action",
//         403
//       );
//       next(error);
//     }
//     next();
//   };
// };
// ṃiddleware
// ***********************************************************************

exports.getUserById = asyncErrorHanlder(async (req, res, next) => {
  const { id } = req.params;
  validateMongoDbId(id);
  const user = await userModel.findById(id);

  if (!user) {
    const error = new CustomError("user with that ID is not found", 404);
    return next(error);
  }

  res.status(200).json({ status: "success", data: { user } });
});
// ***********************************************************************
exports.getUserDelete = asyncErrorHanlder(async (req, res, next) => {
  const { id } = req.params;
  const user = await userModel.findByIdAndDelete(id);
  if (!user) {
    const error = new CustomError("user with that ID is not found", 404);
    return next(error);
  }
  res.status(200).json({ status: "deleted", data: null });
});

// ***********************************************************************
// for update function we going to set req.user
exports.getUserUpdate = asyncErrorHanlder(async (req, res, next) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
  const user = await userModel.findByIdAndUpdate(_id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!user) {
    const error = new CustomError("user with that ID is not found", 404);
    return next(error);
  }
  res.json({ status: "success", user });
});
// ***********************************************************************
exports.fetchAllUser = asyncErrorHanlder(async (req, res, next) => {
  const userArray = await userModel.find();

  res.status(200).json({ status: "success", userArray });
});

// ***********************************************************************
exports.blockUser = asyncErrorHanlder(async (req, res, next) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const block = await userModel.findByIdAndUpdate(
      id,
      { isBlocked: true },
      { new: true }
    );
    res.status(200).json({ blocked: "userblocked", block });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
// ***********************************************************************
exports.unblockUser = asyncErrorHanlder(async (req, res, next) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const unblock = await userModel.findByIdAndUpdate(
      id,
      { isBlocked: false },
      { new: true }
    );
    res.status(200).json({ unblocked: "userunblocked", unblock });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

exports.updatePassword = asyncErrorHanlder(async (req, res, next) => {
  const { _id } = req.user;
  const { password } = req.body;
  validateMongoDbId(_id);
  const user = await userModel.findById(_id);

  if (password) {
    user.password = password;
    const updatedPassword = await user.save();
    res.json({ updatedPassword });
  } else {
    res.json({ user });
  }
});

// *********************************************************************

exports.saveAddress = asyncErrorHanlder(async (req, res, next) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    const updatedUser = await userModel.findByIdAndUpdate(
      _id,
      { address: req.body.address },
      { new: true }
    );
    res.status(200).json({ updatedUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// **********************************************************************

exports.getWishList = asyncErrorHanlder(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);

  const getBlog = await userModel.aggregate([
    { $match: { _id: new mongoose.Types.ObjectId(_id) } },
    {
      $lookup: {
        from: "products",
        localField: "wishlist",
        foreignField: "_id",
        as: "wishlist",
      },
    },
  ]);

  res.status(200).json({ getBlog: getBlog[0] });
});
// **********************************************************************
exports.userCart = asyncErrorHanlder(async (req, res) => {
  const { cart } = req.body;
  const { _id } = req.user;

  validateMongoDbId(_id);
  try {
    let products = [];
    const user = await userModel.findById(_id);

    const alreadyExistCart = await cartModel.findOne({ orderby: user._id });

    if (alreadyExistCart) {
      await cartModel.deleteOne({ _id: alreadyExistCart._id });
    }

    for (let i = 0; i < cart.length; i++) {
      let object = {};
      object.product = cart[i]._id;
      object.count = cart[i].count;
      object.color = cart[i].color;
      const getPrice = await productModel
        .findById(cart[i]._id)
        .select("price")
        .exec();
      object.price = getPrice.price;
      products.push(object);
    }
    let cartTotal = 0;

    for (let i = 0; i < products.length; i++) {
      cartTotal += products[i].price * products[i].count;
    }

    let newCart = await new cartModel({
      products,
      cartTotal,
      orderby: user?._id,
    }).save();
    res.status(200).json({ newCart });
  } catch (error) {}
});

// *************************************************************************
exports.getUserCart = asyncErrorHanlder(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);

  const cart = await cartModel
    .findOne({ orderby: _id })
    .populate("products.product");
  // products is array in cartModel
  // product is object name inside the product array and it contains product id

  res.status(200).json({ cart });
});

// *************************************************************************
exports.emptyCart = asyncErrorHanlder(async (req, res, next) => {
  const { _id } = req.user;
  validateMongoDbId(_id);

  const user = await userModel.findOne({ _id });

  const cart = await cartModel.findOneAndRemove({ orderby: user._id });
  if (!cart) {
    const error = new CustomError("Order not exist", 404);
    return next(error);
  }

  res.status(200).json({ cart });
});
// **********************************************************************
exports.applyCoupon = asyncErrorHanlder(async (req, res, next) => {
  const { coupon } = req.body;
  const { _id } = req.user;
  validateMongoDbId(_id);
  const validCoupon = await couponModel.findOne({ name: coupon });

  if (validCoupon == null) {
    const error = new CustomError("Invalid Coupon", 404);
    return next(error);
  }
  const user = await userModel.findOne({ _id });

  let { cartTotal } = await cartModel
    .findOne({ orderby: user._id })
    .populate("products.product");
  let totalAfterDiscount = (
    cartTotal -
    (cartTotal * parseInt(validCoupon.discount)) / 100
  ).toFixed(2);

  const total = await cartModel.findOneAndUpdate(
    { orderby: user._id },
    { totalAfterDiscount },
    {
      new: true,
    }
  );
  res.status(200).json({ total });
});
// **********************************************************************
exports.createOrder = asyncErrorHanlder(async (req, res, next) => {
  const { COD, couponApplied } = req.body;
  const { _id } = req.user;
  validateMongoDbId(_id);

  try {
    if (!COD) {
      const error = new CustomError("create cash order failed");
      return next(error);
    }

    const user = await userModel.findById(_id);
    let userCart = await cartModel.findOne({ orderby: user._id });
    let finalAmount = 0;

    if (couponApplied && userCart.totalAfterDiscount) {
      finalAmount = userCart.totalAfterDiscount;
    } else {
      finalAmount = userCart.cartTotal;
    }
    let newOrder = await new orderModel({
      products: userCart.products,
      paymentIntent: {
        id: uniqueId(),
        amount: finalAmount,
        method: "COD",
        status: "Cash on Delivery",
        created: Date.now(),
        currency: "usd",
      },
      orderby: user._id,
      orderStatus: "Cash on Delivery",
    }).save();

    let update = userCart.products.map((item) => {
      return {
        updateOne: {
          filter: { _id: item.product._id },
          update: { $inc: { quantity: -item.count, sold: +item.count } },
        },
      };
    });
    await productModel.bulkWrite(update, {});
    res.json({ message: "success" });
  } catch (error) {}
});
// *********************************************************************
exports.getOrders = asyncErrorHanlder(async (req, res, next) => {
  const { _id } = req.user;

  validateMongoDbId(_id);
  const userOrders = await orderModel
    .findOne({ orderby: _id })
    .populate("products.product")
    .exec();
  res.json({ userOrders });
  console.log(userOrders);
});

exports.getOrders = asyncErrorHanlder(async (req, res, next) => {
  const { _id } = req.user;
  validateMongoDbId(_id);

  const userOrders = await orderModel.aggregate([
    {
      $match: { orderby: new mongoose.Types.ObjectId(_id) },
    },
    {
      $lookup: {
        from: "products", // Assuming your products collection is named "products"
        localField: "products.product",
        foreignField: "_id",
        as: "products",
      },
      $lookup: {
        from: "users",
        localField: "orderby",
        foreignField: "_id",
        as: "orderby",
      },
    },
  ]);

  if (userOrders.length === 0) {
    const error = new CustomError("No orders found for the user", 404);
    return next(error);
  }

  res.status(200).json({ userOrders: userOrders[0] });
});
// ***********************************************************************

exports.getAllOrders = asyncErrorHanlder(async (req, res) => {
  try {
    const alluserOrders = await orderModel.aggregate([
      {
        $lookup: {
          from: "products",
          localField: "products.product",
          foreignField: "_id",
          as: "products",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "orderby",
          foreignField: "_id",
          as: "orderby",
        },
      },
    ]);

    res.status(200).json({ alluserOrders });
  } catch (error) {}
});

// exports.getAllOrders = asyncErrorHanlder(async (req, res, next) => {
//   const alluserOrders = await orderModel
//     .find()
//     .populate("products.product")
//     .populate("orderby")
//     .exec();
//   res.json({ alluserOrders });
//   console.log(userOrders);
// });
// ***************************************************************************
exports.updateOrderStatus = asyncErrorHanlder(async (req, res, next) => {
  const { status } = req.body;
  const { id } = req.params;
  validateMongoDbId(id);

  const updateOrderStatus = await orderModel.findByIdAndUpdate(
    id,
    {
      orderStatus: status,
      paymentIntent: { status },
    },
    { new: true }
  );
  // const orderWithProducts = await orderModel.aggregate([
  //   {
  //     $match: { _id: updateOrderStatus._id }
  //   },
  //   {
  //     $lookup: {
  //       from: "products",
  //       localField: "products.product",
  //       foreignField: "_id",
  //       as: "product"
  //     }
  //   }
  // ]);

  res.status(200).json({ updateOrderStatus });
});
