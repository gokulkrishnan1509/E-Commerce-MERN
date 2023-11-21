const express = require("express");
const router = express.Router();
const {
  createEnquiry,
  updateEnquiry,
  deleteEnquiry,
  getAllEnquiry,
  getOneEnquiry,
} = require("../controller/enqController");
const { protect, restrict } = require("../controller/userController");

// ********These routes handle by user's ***********************
router.route("/get-allquery").get(getAllEnquiry);
router.route("/get-onequery/:id").get(getOneEnquiry);
router.route("/create-query").post(createEnquiry);

// ********These routes handle by admin's******************
router
  .route("/update-query/:id")
  .patch(protect, restrict("admin", "super admin"), updateEnquiry);
router
  .route("/delete-query/:id")
  .delete(protect, restrict("admin", "super admin"), deleteEnquiry);

module.exports = router;
