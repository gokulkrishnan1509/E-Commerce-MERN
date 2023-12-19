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
  removeProductFromCart,
  updateProductQuantityFromCart,
  createOrder,
  getMyOrders,
  getMonthWiseOrderIncome,
  getMonthWiseOrderCount,
} = require("../controller/userController");

// const { checkOut, paymentVerification } = require("../controller/paymentCtrl");

router.route("/post").post(createUser);
router.route("/login").post(login);
router.route("/forgot").post(forgotPassword);
router.route("/reset/:token").patch(resetPassword);
router.route("/deleteuser/:id").delete(getUserDelete);
router.route("/cookie").put(handleRefreshToken);
router.route("/logout").delete(logout);
router.route("/admin-login").post(adminLogin);
router.route("/fetchall").get(fetchAllUser);

// payment routes for user's
// router.route("/order/checkout").post(protect, checkOut);
// router.route("/order/paymentverfication").post(protect, paymentVerification);

// this below url update by authorized user.
router.route("/updateuser").patch(protect, getUserUpdate);
router.route("/password-update").patch(protect, updatePassword);
router.route("/get-wishlist").get(protect, getWishList);
router.route("/user-address").patch(protect, saveAddress);
router.route("/user-cart").patch(protect, userCart);
router.route("/user-getcart").get(protect, getUserCart);
router.route("/cart/create-order").post(protect, createOrder);
router.route("/delete-usercart/:id").delete(protect, removeProductFromCart);
router.route("/getmyorders").get(protect, getMyOrders);
router.route("/getMonthWiseOrderCount").get(protect, getMonthWiseOrderCount);
router
  .route("/getMonthWiseByOrderIncome")
  .get(protect, getMonthWiseOrderIncome);

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

module.exports = router;
