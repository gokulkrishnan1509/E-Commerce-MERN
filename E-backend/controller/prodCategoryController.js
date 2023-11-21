const Category = require("../model/prodCategoryModel");
const asyncErrorHanlder = require("../utils/asyncErrorHandler");
const CustomError = require("../utils/customError");
const validateMongoDbId = require("../utils/validateMongooseId");

const createCategory = asyncErrorHanlder(async (req, res, next) => {
  const newCategory = await Category.create(req.body);

  res.status(210).json({ newCategory });
});

const updateCategory = asyncErrorHanlder(async (req, res, next) => {
  const { id } = req.params;
  validateMongoDbId(id);
  const updatedCategory = await Category.findByIdAndUpdate(id, req.body, {
    new: true,runValidators:true
  });

  if (!updatedCategory) {
    const error = new CustomError("Given Id Not Exist in DB ", 404);
    return next(error);
  }

  res.status(200).json({ updatedCategory });
});

const deleteCategory = asyncErrorHanlder(async (req, res, next) => {
  const { id } = req.params;
  validateMongoDbId(id);

  const deletedCategory = await Category.findByIdAndDelete(id);

  if (!deletedCategory) {
    const error = new CustomError("Given ID not exist in DB ", 404);
    return next(error);
  }
  res.json({ deletedCategory });
});

const getAllCategory = asyncErrorHanlder(async (req, res, next) => {
  const getAll = await Category.find();
  res.status(200).json({ getAll });
});

const getCategory = asyncErrorHanlder(async (req, res, next) => {
  const { id } = req.params;
  validateMongoDbId(id);
  const getCategoryById = await Category.findById(id);
  if (!getCategoryById) {
    const error = new CustomError("Given ID not exist in DB", 404);
    return next(error);
  }
  res.status(200).json({getCategoryById})
});
module.exports = {
  createCategory,
  updateCategory,
  deleteCategory,
  getAllCategory,
  getCategory
};
