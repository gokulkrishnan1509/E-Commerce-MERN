const express = require("express");
const router = express.Router();
const {
  createBrand,
  updateBrand,
  deleteBrand,
  getBrand,
  getOneBrand,
} = require("../controller/brandController");
const { protect, restrict } = require("../controller/userController");

router
  .route("/brand-create")
  .post(createBrand);
router
  .route("/brand-update/:id")
  .patch(protect, restrict("admin", "super admin"), updateBrand);
router
  .route("/brand-delete/:id")
  .delete(protect, restrict("admin", "super admin"), deleteBrand);
router.route("/brand-getAll").get(getBrand);
router.route("/brand-id/:id").get(getOneBrand);

module.exports = router;
