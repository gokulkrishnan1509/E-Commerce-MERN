// const Razorpay = require("razorpay");
// const instance = new Razorpay({
//   key_id: "",
//   key_secret: "",
// });

// const checkOut = async (req, res) => {
//   const option = {
//     amount: 50000,
//     currency: "INR",
//   };

//   const order = await instance.orders.create(option);
//   res.json({ success: true, order });
// };

// const paymentVerification = async (req, res) => {
//   const { razorPayOrderId, razorpayPaymentId } = req.body;

//   res.json({
//     razorPayOrderId,
//     razorpayPaymentId,
//   });
// };

// module.exports = { checkOut, paymentVerification };
