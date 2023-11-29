const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv").config();
const express = require("express");
const bodyparser = require("body-parser");
const cookiParser = require("cookie-parser");
const app = express();

// ******************Invoked Util Files ********************************

const globalErrorHandler = require("./utils/errorController");
const CustomError = require("./utils/customError");

// ****************Invoking Router Files *******************************
const userRouter = require("./routes/userRoute");
const productRouter = require("./routes/productRoute");
const blogRouter = require("./routes/blogRoutes");
const categoryRouter = require("./routes/prodCategoryRoutes");
const blogCategoryRouter = require("./routes/blogCategoryRouter");
const brandRouter = require("./routes/brandRouter");
const couponRouter = require("./routes/couponRoutes");
const colorRouter = require("./routes/colorRoutes");
const queryRouter = require("./routes/enqRoutes");
const uploadRouter = require("./routes/uploadRouts");

// ********************MongoDB connection *************************
mongoose
  .connect(process.env.LOCAL_CONNECT, { useNewUrlParser: true })
  .then((conn) => {
    console.log("DB_CONNECTED");
  })
  .catch((error) => {
    console.log("Error to Connection DB");
  });

// ***************Thrid party libraries*******************************
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cors());
app.use(cookiParser());

// *******************Handling Router Files**********************
app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/blog", blogRouter);
app.use("/category", categoryRouter);
app.use("/blogcategory", blogCategoryRouter);
app.use("/brand", brandRouter);
app.use("/coupon", couponRouter);
app.use("/color", colorRouter);
app.use("/query", queryRouter);
app.use("/uploadimage", uploadRouter);

// ***********************Handling Router Error *****************
app.all("*", (req, res, next) => {
  const error = new CustomError(
    `can't find ${req.originalUrl} on the server!`,
    404
  );
  next(error);
});

// *********************Handling Global Error *******************
app.use(globalErrorHandler);

app.listen(process.env.PORT, () => {
  console.log(`${process.env.PORT}`);
});
