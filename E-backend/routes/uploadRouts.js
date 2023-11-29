const express = require("express");
const router = express.Router();
const { uploadImages, deleteImages } = require("../controller/uploadControl");

const { protect, restrict } = require("../controller/userController");

const { uploadPhoto, productImgResize } = require("../utils/uploadImages");







// *************************************************************************

// http://localhost:1509/product/upload/654e0f37b2a65ea5abfc624f
// in postman we have to set like above and  this(654e0f37b2a65ea5abfc624f) it is an product id
// in form-data of headers in post we have to set (images as key)  and (value as upload image)
router
  .route("/upload")
  .put(
    protect,
    restrict("admin", "super admin"),
    uploadPhoto.array("images", 10),
    productImgResize,
    uploadImages
  );

router
  .route("/delete-img/:id")
  .delete(protect, restrict("admin", "super admin"), deleteImages);

module.exports = router;

// *********************************************************************