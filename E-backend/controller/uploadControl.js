const asyncErrorHandler = require("../utils/asyncErrorHandler");
const {
  cloudinaryUploadImg,
  cloudinaryDeleteImg,
} = require("../utils/cloudinary");
const fs = require("fs");

exports.uploadImages = asyncErrorHandler(async (req, res) => {
  const uploader = (path) => cloudinaryUploadImg(path, "images");
  const urls = [];
  const files = req.files;

  for (let file of files) {
    const { path } = file;
    const newPath = await uploader(path);
    urls.push(newPath);
    fs.unlinkSync(path);
  }

  const images = urls.map((file) => {
    return file;
  });

     // const findProduct = await ProductArray.findByIdAndUpdate(
//   //   id,
//   //   {
//   //     images: urls.map((file) => {
//   //       return file;
//   //     }),
//   //   },
//   //   { new: true }
//   // );
  res.status(200).json({ images });
});

// 1.this Id will come from cloudinary
// 2. this Id belongs to cloudinary id keyname is (public_id as key)

exports.deleteImages = asyncErrorHandler(async (req, res) => {
  const { id } = req.params;
  await cloudinaryDeleteImg(id, "images");

  res.status(200).json({ message: "Deleted" });
});
