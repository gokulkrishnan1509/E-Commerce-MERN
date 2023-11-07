const asyncErrorHanlder = require("../utils/asyncErrorHandler");
const userModel = require("../model/userModel");
const jwt = require("jsonwebtoken");
const CustomError = require("../utils/customError");
const util = require("util");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const validateMongoDbId = require("../utils/validateMongooseId");
const { generateRefreshToken } = require("../utils/refreshToken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.SECERET_STRING, {
    expiresIn: process.env.EXPIRE_DAYS,
  });
};
// --------------------------------------------------------------------------
exports.createUser = asyncErrorHanlder(async (req, res, next) => {
  try {
    const user = await userModel.create(req.body);

    const token = generateToken(user._id);

    res.status(200).json({ status: "success", data: { user }, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
// ----------------------------------------------------------------------------

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

  res.status(200).json({ status: "success", token });
});

exports.logout = asyncErrorHanlder(async (req, res, next) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) {
    const error = new CustomError("No Refresh Token in Cookies");
    return next(error);
  }
  const refreshToken = cookie.refreshToken;
  const user = await userModel.findOne({ refreshToken });
  // console.log(user)
  if (!user) {
    res.clearCookie("refreshToken", { httpOnly: true, secure: true });
    return res.status(204).send();
  }

  await userModel.findByIdAndUpdate(user._id, { refreshToken: "" });
  res.clearCookie("refreshToken", { httpOnly: true, secure: true });

  return res.status(204).send();
});

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

  if (user.id !== decodedToken.id) {
    const error = new CustomError("error occured", 400);
    return next(error);
  }

  const accesstoken = generateToken(user._id);
  res.json({ accesstoken });
});

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
// -------------------------------------------------------------------------------------------------------------------

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

exports.getUserDelete = asyncErrorHanlder(async (req, res, next) => {
  const { id } = req.params;
  const user = await userModel.findByIdAndDelete(id);
  if (!user) {
    const error = new CustomError("user with that ID is not found", 404);
    return next(error);
  }
  res.status(200).json({ status: "deleted", data: null });
});

// for update function we going to set req.user
exports.getUserUpdate = asyncErrorHanlder(async (req, res, next) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
  const user = await userModel.findByIdAndUpdate(_id, req.body, {
    new: true,
  });
  if (!user) {
    const error = new CustomError("user with that ID is not found", 404);
    return next(error);
  }
  res.json({ status: "success", user });
});

exports.fetchAllUser = asyncErrorHanlder(async (req, res, next) => {
  const userArray = await userModel.find();

  res.status(200).json({ status: "success", userArray });
});

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
