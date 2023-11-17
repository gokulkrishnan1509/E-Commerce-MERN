const express = require("express");
const router = express.Router();
const {
  createCategory,
  updateCategory,
  deleteCategory,
  getAllCategory,
  getCategory,
} = require("../controller/prodCategoryController");
const { protect, restrict } = require("../controller/userController");

router
  .route("/create-category")
  .post(protect, restrict("admin", "super admin"), createCategory);
router
  .route("/update-category/:id")
  .patch(protect, restrict("admin", "super admin"), updateCategory);
router
  .route("/delete-category/:id")
  .delete(protect, restrict("admin", "super admin"), deleteCategory);

router.route("/getall-category").get(getAllCategory);
router.route("/getcate/:id").get(getCategory);
module.exports = router;
