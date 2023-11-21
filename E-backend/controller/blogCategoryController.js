const blogCategory = require("../model/blogCategoryModel");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const CustomError = require("../utils/customError");
const validateMongoDbId = require("../utils/validateMongooseId");

const createBlogCate = asyncErrorHandler(async (req, res, next) => {
  const newCategory = await blogCategory.create(req.body);
  res.status(201).json({ newCategory });
});

const updateBlogCate = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;
  validateMongoDbId(id);
  const updatedCategory = await blogCategory.findByIdAndUpdate(id, req.body, {
    new: true,runValidators:true
  });
  if (!updatedCategory) {
    const error = CustomError("Given Id not exist in DB", 404);
    return next(error);
  }
  res.status(200).json({ updatedCategory });
});

const deleteBlogCate = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;
  validateMongoDbId(id);
  const deletedCategory = await blogCategory.findByIdAndDelete(id);
  if (!deletedCategory) {
    const error = new CustomError("Given Id not exist in DB", 404);
    return next(error);
  }

  res.json({ deletedCategory });
});

const getAllBlogCate = asyncErrorHandler(async (req, res, next) => {
  const getAll = await blogCategory.find();

  res.status(200).json({ getAll });
});

const getBlogCate = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;
  validateMongoDbId(id);
  const getOneCategory = await blogCategory.findById(id);

  if (!getOneCategory) {
    const error = new CustomError("Given ID not exist in DB", 404);
    return next(error);
  }
  res.status(200).json({ getOneCategory });
});

module.exports = {
  createBlogCate,
  getBlogCate,
  getAllBlogCate,
  deleteBlogCate,
  updateBlogCate,
};
