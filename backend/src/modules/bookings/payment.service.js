const Razorpay = require("razorpay");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const createPaymentOrder = async (amount, receipt) => {
  return razorpay.orders.create({
    amount: amount * 100, // paise
    currency: "INR",
    receipt,
  });
};

module.exports = { createPaymentOrder };
