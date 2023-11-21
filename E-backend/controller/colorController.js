const colorModel = require("../model/colorModel");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const validateMongoDbId = require("../utils/validateMongooseId");
const customError = require("../utils/customError");

const createColor = asyncErrorHandler(async (req, res) => {
  const newColor = await colorModel.create(req.body);
  res.status(201).json({ newColor });
});

const updateColor = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;
  validateMongoDbId(id);
  const updatedColor = await colorModel.findByIdAndUpdate(id, req.body, {
    new: true,runValidators:true
  });
  if (!updatedColor) {
    const error = new customError("Given Id not exist in DB", 404);
    return next(error);
  }
  res.status(200).json({ updatedColor });
});

const deleteColor = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;
  validateMongoDbId(id);
  const deletedColor = await colorModel.findByIdAndDelete(id);
  if (!deletedColor) {
    const error = new customError("Given Id not exis in DB", 404);
    return next(error);
  }
  res.status(200).json({ message: "Deleted" });
});

const getOneColor = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;
  validateMongoDbId(id);
  const getOneColorId = await colorModel.findById(id);
  if (!getOneColorId) {
    const error = new customError("Given ID not exist in DB", 404);
    return next(error);
  }
  res.status(200).json({ getOneColorId });
});

const getAllColor = asyncErrorHandler(async (req, res, next) => {
  const getAllColores = await colorModel.find();
  res.status(200).json({ getAllColores });
});

module.exports = { createColor, updateColor, deleteColor, getOneColor,getAllColor };
