const express = require("express");
const router = express.Router();
const {
  createProduct,
  getProduct,
  updateProduct,
  getAllProduct,
  deleteProduct,
  addToWishList,
  ratingfunc,
  // uploadImages,
  // deleteImages,
} = require("../controller/productController");
const { uploadPhoto, productImgResize } = require("../utils/uploadImages");
const { protect, restrict } = require("../controller/userController");

// *************************These routes are access by admin*************
router
  .route("/product-id/:id")
  .get(protect, restrict("admin", "super admin"), getProduct);
router
  .route("/product-update/:id")
  .patch(protect, restrict("admin", "super admin"), updateProduct);
router
  .route("/product-delete/:id")
  .delete(protect, restrict("admin", "super admin"), deleteProduct);
router
  .route("/product-post")
  .post(protect, restrict("admin", "super admin"), createProduct);

// http://localhost:1509/product/upload/654e0f37b2a65ea5abfc624f
// in postman we have to set like above and  this(654e0f37b2a65ea5abfc624f) it is an product id
// in form-data of headers in post we have to set (images as key)  and (value as upload image)
// router
//   .route("/upload")
//   .put(
//     protect,
//     restrict("admin", "super admin"),
//     uploadPhoto.array("images", 10),
//     productImgResize,
//     uploadImages
//   );

// router
  // .route("/delete-img/:id")
  // .delete(protect, restrict("admin", "super admin"), deleteImages);
// ******************get all product************************************
router.route("/all-product").get(getAllProduct);

// ****************** access the route those who loged in **************
router.route("/wishlist").patch(protect, addToWishList);
router.route("/rating").patch(protect, ratingfunc);

module.exports = router;
