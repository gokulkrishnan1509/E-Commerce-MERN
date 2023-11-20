const blogArray = require("../model/blogModel");
const userArray = require("../model/userModel");
const asyncErrorHanlder = require("../utils/asyncErrorHandler");
const CustomError = require("../utils/customError");
const validateMongoDbId = require("../utils/validateMongooseId");
const mongoose = require("mongoose");
const cloudinaryUploadImg = require("../utils/cloudinary");
const fs = require("fs");

const createBlog = asyncErrorHanlder(async (req, res) => {
  const newBlog = await blogArray.create(req.body);

  res.status(201).json({ status: "success", newBlog });
});
// ***********************************************************************
const updateBlog = asyncErrorHanlder(async (req, res) => {
  const patchedBlog = await blogArray.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json({ patchedBlog });
});
// ***********************************************************************
const getBlog = asyncErrorHanlder(async (req, res, next) => {
  const { id } = req.params;
  validateMongoDbId(id);

  const getBlog = await blogArray.aggregate([
    { $match: { _id: new mongoose.Types.ObjectId(id) } },
    {
      $lookup: {
        from: "users",
        localField: "likes",
        foreignField: "_id",
        as: "likes",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "dislikes",
        foreignField: "_id",
        as: "dislikes",
      },
    },
  ]);

  await blogArray.findByIdAndUpdate(
    id,
    { $inc: { numViews: 1 } },
    { new: true }
  );
  res.json({ data: getBlog[0] });
  // console.log(getBlog)
});

// ***********************************************************************
const getAllBlogs = asyncErrorHanlder(async (req, res) => {
  const getBlogs = await blogArray.find();
  res.status(200).json({ getBlogs });
});
// ***********************************************************************
const deleteBlog = asyncErrorHanlder(async (req, res, next) => {
  validateMongoDbId(req.params.id);
  const deleteBlog = await blogArray.findByIdAndDelete(req.params.id);

  if (!deleteBlog) {
    const error = new CustomError("Blog not found", 404);
    return next(error);
  }
  res.json({ status: "deleted" });
});
// **********************************************************************
const likeBlog = asyncErrorHanlder(async (req, res, next) => {
  const { blogId } = req.body;
  validateMongoDbId(blogId);
  // Find the blog which you want to be liked
  const blog = await blogArray.findById(blogId);
  // find the login user
  const loginUserId = req.user?._id;
  // find if the user has liked the blog
  const isLiked = blog?.isLiked;
  //  find if the user has disliked the blog
  const alreadyDisliked = blog?.dislikes?.find(
    (userId) => userId.toString() === loginUserId.toString()
  );

  if (alreadyDisliked) {
    await blogArray.findByIdAndUpdate(
      blogId,
      {
        $pull: { dislikes: loginUserId },
        isDisLiked: false,
      },
      { new: true }
    );

    // return res.json({ blog });
  }

  if (isLiked) {
    const blog = await blogArray.findByIdAndUpdate(
      blogId,
      {
        $pull: { likes: loginUserId },
        isLiked: false,
      },
      { new: true }
    );
    return res.json({ blog });
  } else {
    const blog = await blogArray.findByIdAndUpdate(
      blogId,
      { $push: { likes: loginUserId }, isLiked: true },
      { new: true }
    );
    return res.status(200).json({ blog });
  }
});

const disLikeBlog = asyncErrorHanlder(async (req, res, next) => {
  const { blogId } = req.body;

  validateMongoDbId(blogId);

  const blog = await blogArray.findById(blogId);
  const loginUserId = req.user?._id;
  const isDisLiked = blog?.isDisLiked;
  const alreadyliked = blog?.likes.find(
    (userId) => userId.toString() === loginUserId.toString()
  );

  if (alreadyliked) {
    await blogArray.findByIdAndUpdate(
      blogId,
      {
        $pull: { likes: loginUserId },
        isLiked: false,
      },
      { new: true }
    );
    // return res.json({ blog });
  }

  if (isDisLiked) {
    const blog = await blogArray.findByIdAndUpdate(
      blogId,
      {
        $pull: { dislikes: loginUserId },
        isDisLiked: false,
      },
      { new: true }
    );
    return res.status(200).json({ blog });
  } else {
    const blog = await blogArray.findByIdAndUpdate(
      blogId,
      { $push: { dislikes: loginUserId }, isDisLiked: true },
      { new: true }
    );
    return res.status(200).json({ blog });
  }
});

const uploadImage = asyncErrorHanlder(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  const uploader = (path) => cloudinaryUploadImg(path, "images");
  const urls = [];

  const files = req.files;
  for (const file of files) {
    const { path } = file;
    const newpath = await uploader(path);
    urls.push(newpath);
    fs.unlinkSync(path);
  }
  const findBlog = await blogArray.findByIdAndUpdate(
    id,
    {
      images: urls.map((file) => {
        return file;
      }),
    },
    { new: true }
  );

  res.json({ findBlog });
});

module.exports = {
  createBlog,
  updateBlog,
  getBlog,
  getAllBlogs,
  deleteBlog,
  likeBlog,
  disLikeBlog,
  uploadImage,
};
