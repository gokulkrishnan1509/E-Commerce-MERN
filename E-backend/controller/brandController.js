const brandArray = require("../model/brandModel");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const CustomError = require("../utils/customError");
const validateMongoDbId = require("../utils/validateMongooseId");

const createBrand = asyncErrorHandler(async (req, res) => {
  const newBrand = await brandArray.create(req.body);
  res.status(201).json({ newBrand });
});

const updateBrand = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;
  validateMongoDbId(id);
  const updatedBrand = await brandArray.findByIdAndUpdate(id, req.body, {
    new: true,runValidators:true
  });
  if (!updatedBrand) {
    const error = new CustomError("Given Id not exist in DB", 404);
    return next(error);
  }
  res.status(200).json({ updatedBrand });
});

const deleteBrand = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;
  validateMongoDbId(id);
  const deletedCategory = await brandArray.findByIdAndDelete(id);
  if (!deletedCategory) {
    const error = new CustomError("Given Id not exist in DB", 404);
    return next(error);
  }

  res.status(200).json({ message:"Deleted" });
});

const getBrand = asyncErrorHandler(async (req, res, next) => {
  const getAllBrand = await brandArray.find();
  res.status(200).json({ getAllBrand });
});

const getOneBrand = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;
  validateMongoDbId(id);
  const getOneId = await brandArray.findById(id);

  if (!getOneId) {
    const error = new CustomError("Given ID not exist in DB", 404);
    return next(error);
  }
  res.status(200).json({ getOneId });
});

module.exports = {
  createBrand,
  updateBrand,
  deleteBrand,
  getBrand,
  getOneBrand,
};
