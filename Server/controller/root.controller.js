import { razorpayInstance } from "../config/razorpay.js";
import { handleError } from "../utils/constant.js";
import { createHmac } from "crypto";

export const razorpayOrder = (req, res) => {
  const { subscription_id } = req.body;
  //   console.log("executing");
  try {
    razorpayInstance.orders.create(
      {
        amount: 1 * 100,
        currency: "INR",
        receipt: `receipt_order_${subscription_id}`,
      },
      (err, order) => {
        if (err) {
          return res.json({
            success: false,
            message: "something went wrong",
          });
        }

        return res.json({
          success: true,
          message: order,
        });
      }
    );
  } catch (error) {
    handleError(error, "Razorpay create order error");
  }
};

export const razorpayVerify = (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  try {
    const secret = process.env.RAZORPAY_SECRET;

    const generatedSignature = createHmac("sha256", secret)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generatedSignature === razorpay_signature) {
      return res.json({
        success: true,
        message: "Payment verified",
      });
    }

    res.json({
      success: false,
      message: "Payment verification failed",
    });
  } catch (error) {
    handleError(error, "Payment verify error");
  }
};
