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
  logout
} = require("../controller/userController");

router.route("/post").post(createUser);
router.route("/login").post(login);
router.route("/forgot").post(forgotPassword);
router.route("/reset/:token").patch(resetPassword);
router.route("/deleteuser/:id").delete(getUserDelete);
router.route("/cookie").put(handleRefreshToken);
router.route('/logout').delete(logout)

// this below url update by authorized user.
router.route("/updateuser").patch(protect, getUserUpdate);

// this below url's will manipulate by admin's
router.route("/getid/:id").get(protect, restrict("admin", "super admin"), getUserById);
router.route("/block-user/:id").patch(protect, restrict("admin", "super admin"), blockUser);
router.route("/unblock-user/:id").patch(protect, restrict("admin", "super admin"), unblockUser);
router.route("/fetchall").get(protect, restrict("admin", "super admin"), fetchAllUser);

module.exports = router;
