const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv").config();
const express = require("express");
const bodyparser = require("body-parser");
const globalErrorHandler = require("./utils/errorController");
const CustomError = require("./utils/customError");
const cookiParser = require('cookie-parser')

// router
const userRouter = require("./routes/userRoute");

const app = express();

mongoose
  .connect(process.env.LOCAL_CONNECT, { useNewUrlParser: true })
  .then((conn) => {
    console.log("DB_CONNECTED");
  })
  .catch((error) => {
    console.log(error);
  });

app.use(bodyparser.json());
app.use(cors());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cookiParser())
app.use("/user", userRouter);

app.all("*", (req, res, next) => {
  const error = new CustomError(
    `can't find ${req.originalUrl} on the server!`,
    404
  );
  next(error);
});

app.use(globalErrorHandler);

app.listen(process.env.PORT, () => {
  console.log(`${process.env.PORT}`);
});
