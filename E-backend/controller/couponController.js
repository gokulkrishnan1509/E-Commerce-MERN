const couponArray = require("../model/couponModel");
const validateMongoDbId = require("../utils/validateMongooseId");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const CustomError = require("../utils/customError");

const createCoupon = asyncErrorHandler(async (req, res) => {
  const newCoupon = await couponArray.create(req.body);

  res.status(201).json({ newCoupon });
});

const getAllCoupons = asyncErrorHandler(async (req, res) => {
  const allCoupons = await couponArray.find();
  res.status(200).json({ allCoupons });
});

const updateCoupons = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;
  validateMongoDbId(id);
  const updatedCoupons = await couponArray.findByIdAndUpdate(id, req.body, {
    new: true,runValidators:true
  });

  if (!updatedCoupons) {
    const error = new CustomError("Data with the given ID not exist", 404);
    return next(error);
  }
  res.status(200).json({ updatedCoupons });
});

const deleteCoupons = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;
  validateMongoDbId(id);
  const deletedCoupon = await couponArray.findByIdAndDelete(id);

  if (!deletedCoupon) {
    const error = new CustomError("Data with the given ID not exist", 404);
    return next(error);
  }
  res.status(200).json({status:"deleted",deleteCoupon})
});

module.exports = { createCoupon, getAllCoupons, updateCoupons ,deleteCoupons};
