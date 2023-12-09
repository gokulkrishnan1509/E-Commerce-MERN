const ProductArray = require("../model/productModel");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const CustomError = require("../utils/customError");
const slugify = require("slugify");
const Apifeatures = require("../utils/pagination");
const userArray = require("../model/userModel");
const validateMongoDbId = require("../utils/validateMongooseId");

exports.createProduct = asyncErrorHandler(async (req, res) => {
  if (req.body.title) {
    req.body.slug = slugify(req.body.title);
  }
  const newProduct = await ProductArray.create(req.body);
  res.status(201).json({ newProduct });
});

exports.updateProduct = asyncErrorHandler(async (req, res, next) => {
  if (req.body.title) {
    req.body.slug = slugify(req.body.title);
  }
  const updateProduct = await ProductArray.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    {
      new: true,
    }
  );
  if (!updateProduct) {
    const error = new CustomError("product with that ID is not found", 404);
    return next(error);
  }
  res.status(200).json({ updateProduct });
});

exports.deleteProduct = asyncErrorHandler(async (req, res, next) => {
  const deleteProduct = await ProductArray.findByIdAndDelete(req.params.id);
  if (!deleteProduct) {
    const error = new CustomError(`product with that ID is not found`, 404);
    return next(error);
  }

  res.status(204).json({ status: "deleted", data: null });
});

exports.getProduct = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await ProductArray.findById(id);

  if (!product) {
    const error = new CustomError(`product with that ID is not found`, 404);
    return next(error);
  }

  res.status(200).json({ product });
});

exports.getAllProduct = asyncErrorHandler(async (req, res) => {
  // -------------------------------------------------------------------
  // http://localhost:1509/product/all-product?brand=Lenovo&catagory=pepsi

  // the above thing is the way to make a query to a below things
  // const getAll = await ProductArray.find(req.query);
  // const getAll = await ProductArray.find({
  //   brand: req.query.brand,
  //   category: req.query.category,
  // });
  // const getAll = await ProductArray.where("category").equals(req.query.category)
  // ---------------------------------------------------------------------------------------

  const getProduct = new Apifeatures(ProductArray.find(), req.query)
    .excludes()
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const getallProudcts = await getProduct.query;
  res.status(200).json({ getallProudcts });
});

exports.addToWishList = asyncErrorHandler(async (req, res, next) => {
  const { _id } = req.user;
  const { prodId } = req.body;
  const user = await userArray.findById(_id);

  if (!user) {
    const error = new CustomError("User with the given ID not exist", 404);
    return next(error);
  }
  const alreadyAdded = user.wishlist.find((id) => id.toString() === prodId);

  if (alreadyAdded) {
    let userProduct = await userArray.findByIdAndUpdate(
      _id,
      { $pull: { wishlist: prodId } },
      { new: true }
    );
    return res.status(200).json({ userProduct });
  } else {
    let productUser = await userArray.findByIdAndUpdate(
      _id,
      { $push: { wishlist: prodId } },
      { new: true }
    );
    return res.status(200).json({ productUser });
  }
});

exports.ratingfunc = asyncErrorHandler(async (req, res, next) => {
  const { _id } = req.user;
  const { star, prodId, comment } = req.body;
  const Product = await ProductArray.findById(prodId);

  if (!Product) {
    const error = new CustomError("Product not exist", 404);
    return next(error);
  }

  // finding the user already rated by user

  let alreadyRated = Product.ratings.find(
    (userId) => userId.postedby.toString() === _id.toString()
  );

  if (alreadyRated) {
    await ProductArray.updateOne(
      {
        ratings: { $elemMatch: alreadyRated },
      },
      { $set: { "ratings.$.star": star, "ratings.$.comment": comment } },
      {
        new: true,
      }
    );
  } else {
    await ProductArray.findByIdAndUpdate(
      prodId,
      { $push: { ratings: { star: star, postedby: _id, comment: comment } } },
      { new: true }
    );
  }

  const getAllRatings = await ProductArray.findById(prodId);
  const totalRating = getAllRatings.ratings.length;
  let ratingsum = getAllRatings.ratings
    .map((item) => item.star)
    .reduce((prev, curr) => prev + curr, 0);
  let actualRating = Math.round(ratingsum / totalRating);
  let finalproduct = await ProductArray.findByIdAndUpdate(
    prodId,
    {
      totalrating: actualRating,
    },
    { new: true }
  );
  res.status(200).json({ finalproduct });
  // console.log(Math.round(9 / 2));
});

// exports.uploadImages = asyncErrorHandler(async (req, res) => {
//   // const { id } = req.params;
//   // validateMongoDbId(id);

//   const uploader = (path) => cloudinaryUploadImg(path, "images");
//   const urls = [];
//   const files = req.files;

//   for (let file of files) {
//     const { path } = file;
//     const newpath = await uploader(path);
//     urls.push(newpath);
//     fs.unlinkSync(path);
//   }

//   const images = urls.map((file) => {
//     return file;
//   });
//   res.status(200).json({ images });
//   // const findProduct = await ProductArray.findByIdAndUpdate(
//   //   id,
//   //   {
//   //     images: urls.map((file) => {
//   //       return file;
//   //     }),
//   //   },
//   //   { new: true }
//   // );
//   // res.status(200).json({ findProduct });
// });

// exports.deleteImages = asyncErrorHandler(async (req, res) => {
//   const { id } = req.params;
//   const deleted = await cloudinaryDeleteImg(id, "images");

//   res.status(200).json({ message: "Deleted" });
// });
