const express = require("express");
const router = express.Router();
const {
  createBlogCate,
  updateBlogCate,
  getAllBlogCate,
  getBlogCate,
  deleteBlogCate,
} = require("../controller/blogCategoryController");

const { protect, restrict } = require("../controller/userController");

router
  .route("/create-blogcategory")
  .post(protect, restrict("admin", "super admin"), createBlogCate);
router
  .route("/update-blogcategory/:id")
  .patch(protect, restrict("admin", "super admin"), updateBlogCate);
router
  .route("/delete-blogcategory/:id")
  .delete(protect, restrict("admin", "super admin"), deleteBlogCate);
router.route("/getall-blogcategory").get(getAllBlogCate);
router.route("/getone-blogcategory/:id").get(getBlogCate);

module.exports = router;
