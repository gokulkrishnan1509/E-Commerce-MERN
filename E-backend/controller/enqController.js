const enqModel = require("../model/enqModel");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const validateMongoDbId = require("../utils/validateMongooseId");
const customError = require("../utils/customError");

const createEnquiry = asyncErrorHandler(async (req, res) => {
  const newEnquiry = await enqModel.create(req.body);
  res.status(201).json({ newEnquiry });
});

const updateEnquiry = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;
  validateMongoDbId(id);
  const updatedQuery = await enqModel.findByIdAndUpdate(id, req.body, {
    new: true,runValidators:true
  });
  if (!updatedQuery) {
    const error = new customError("Given Id not exist in DB", 404);
    return next(error);
  }
  res.status(200).json({ updatedQuery });
});

const deleteEnquiry = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;
  validateMongoDbId(id);
  const deletedEnquiry = await enqModel.findByIdAndDelete(id);
  if (!deletedEnquiry) {
    const error = new customError("Given Id not exist in DB", 404);
    return next(error);
  }
  res.status(200).json({ message: "Deleted" });
});

const getOneEnquiry = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;
  validateMongoDbId(id);
  const getOneEnquiryById = await enqModel.findById(id);
  if (!getOneEnquiryById) {
    const error = new customError("Given ID not exist in DB", 404);
    return next(error);
  }
  res.status(200).json({ getOneEnquiryById });
});

const getAllEnquiry = asyncErrorHandler(async (req, res, next) => {
  const getAllQuery = await enqModel.find();
  res.status(200).json({ getAllQuery });
});

module.exports = {
  createEnquiry,
  updateEnquiry,
  deleteEnquiry,
  getAllEnquiry,
  getOneEnquiry,
};
