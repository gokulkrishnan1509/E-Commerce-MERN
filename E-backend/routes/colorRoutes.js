const express = require("express");
const router = express.Router();
const {
  getAllColor,
  getOneColor,
  createColor,
  updateColor,
  deleteColor,
} = require("../controller/colorController");
const { protect, restrict } = require("../controller/userController");

// *****************users routes**********************************
router.route("/getallcolor").get(getAllColor);
router.route("/getonecolor/:id").get(getOneColor);

// ******************Admin controller*****************************
router
  .route("/updatecolor/:id")
  .patch(protect, restrict("admin", "super admin"), updateColor);
router
  .route("/deletecolor/:id")
  .delete(protect, restrict("admin", "super admin"), deleteColor);
router
  .route("/createcolor")
  .post(protect, restrict("admin", "super admin"), createColor);

module.exports = router;
