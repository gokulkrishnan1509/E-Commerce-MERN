const express = require("express");
const router = express.Router();
const {
  createCoupon,
  getAllCoupons,
  updateCoupons,
  deleteCoupons,
  getOneCoupons,
} = require("../controller/couponController");
const { restrict, protect } = require("../controller/userController");

router
  .route("/create-coupon")
  .post(protect, restrict("admin", "super admin"), createCoupon);

router
  .route("/all-coupons")
  .get(protect, restrict("admin", "super admin"), getAllCoupons);

router
  .route("/update-coupon/:id")
  .patch(protect, restrict("admin", "super admin"), updateCoupons);
router
  .route("/delete-coupon/:id")
  .delete(protect, restrict("admin", "super admin"), deleteCoupons);

router
  .route("/get-coupon/:id")
  .get(protect, restrict("admin", "super admin"), getOneCoupons);
module.exports = router;
