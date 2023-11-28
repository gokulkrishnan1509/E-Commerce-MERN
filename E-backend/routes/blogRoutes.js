const express = require("express");
const router = express.Router();
const {
  createBlog,
  updateBlog,
  getBlog,
  getAllBlogs,
  deleteBlog,
  likeBlog,
  disLikeBlog,
  uploadImage,
} = require("../controller/blogController");
const { restrict, protect } = require("../controller/userController");
const { uploadPhoto, blogImgResize } = require("../utils/uploadImages");

router
  .route("/blog-post")
  .post(createBlog);

router
  .route("/blog-uploading/:id")
  .put(
    protect,
    restrict("admin", "super admin"),
    uploadPhoto.array("images", 2),
    blogImgResize,
    uploadImage
  );
router
  .route("/blog-update/:id")
  .patch(protect, restrict("admin", "super admin"), updateBlog);
router.route("/blog-spec/:id").get(getBlog);

router.route("/blog-all").get(getAllBlogs);
router
  .route("/blog-delete/:id")
  .delete(protect, restrict("admin", "super admin"), deleteBlog);
router.route("/likes").put(protect, likeBlog);
router.route("/dislikes").put(protect, disLikeBlog);

module.exports = router;
