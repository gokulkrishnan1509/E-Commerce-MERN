const express = require("express");
const router = express.Router();
const {
  createUser,
  login,
  forgotPassword,
  resetPassword,
  fetchAllUser,
  protect,
  restrict,
  getUserById,
  getUserDelete,
  getUserUpdate,
  blockUser,
  unblockUser,
  handleRefreshToken,
  logout,
  updatePassword,
  adminLogin,
  getWishList,
  saveAddress,
  userCart,
  getUserCart,
  emptyCart,
  applyCoupon,
  createOrder,
  getOrders,
  updateOrderStatus,
  getAllOrders,
  getOrderByUserId,
  removeProductFromCart,
  updateProductQuantityFromCart,
} = require("../controller/userController");

router.route("/post").post(createUser);
router.route("/login").post(login);
router.route("/forgot").post(forgotPassword);
router.route("/reset/:token").patch(resetPassword);
router.route("/deleteuser/:id").delete(getUserDelete);
router.route("/cookie").put(handleRefreshToken);
router.route("/logout").delete(logout);
router.route("/admin-login").post(adminLogin);
router.route("/fetchall").get(fetchAllUser);

// this below url update by authorized user.
router.route("/updateuser").patch(protect, getUserUpdate);
router.route("/password-update").patch(protect, updatePassword);
router.route("/get-wishlist").get(protect, getWishList);
router.route("/user-address").patch(protect, saveAddress);
router.route("/user-cart").patch(protect, userCart);
router.route("/user-getcart").get(protect, getUserCart);
router.route("/empty-user").delete(protect, emptyCart);
router.route("/apply-coupon").post(protect, applyCoupon);
router.route("/user-order").post(protect, createOrder);
router.route("/user-getorder").get(protect, getOrders);
router.route("/delete-usercart/:id").delete(protect, removeProductFromCart);
router
  .route("/update-cartitem/:id/:newQuantity")
  .patch(protect, updateProductQuantityFromCart);

// this below url's will manipulate by admin's
router
  .route("/getid/:id")
  .get(protect, restrict("admin", "super admin"), getUserById);
router
  .route("/block-user/:id")
  .patch(protect, restrict("admin", "super admin"), blockUser);
router
  .route("/unblock-user/:id")
  .patch(protect, restrict("admin", "super admin"), unblockUser);

router
  .route("/update-order/:id")
  .patch(protect, restrict("admin", "super admin"), updateOrderStatus);

router
  .route("/getall-orders")
  .get(protect, restrict("admin", "super admin"), getAllOrders);

router
  .route("/getorderbyuser/:id")
  .post(protect, restrict("admin", "super admin"), getOrderByUserId);

module.exports = router;
