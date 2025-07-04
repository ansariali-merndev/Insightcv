import PdfParse from "pdf-parse/lib/pdf-parse.js";
import { razorpayInstance } from "../config/razorpay.js";
import { handleError } from "../utils/constant.js";
import { createHmac } from "crypto";
import { cohere } from "../config/cohere.js";
import { decrementLimit, insightLimit } from "../utils/utils.js";

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

export const razorpayVerify = async (req, res) => {
  const { InsightAuth } = req.cookies;
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  try {
    const secret = process.env.RAZORPAY_SECRET;

    const generatedSignature = createHmac("sha256", secret)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generatedSignature === razorpay_signature) {
      await decrementLimit(InsightAuth);
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

export const fileUploader = async (req, res) => {
  const { jobdesc } = req.body;
  console.log("jobdesc: ", jobdesc);
  const { InsightAuth } = req.cookies;
  try {
    const limit = await insightLimit(InsightAuth);
    console.log("Limit: ", limit);
    if (!limit) {
      return res.json({
        success: false,
        message: "payment required",
      });
    }

    const fileBuffer = req.file.buffer;
    const data = await PdfParse(fileBuffer);

    const cleanData = data.text.replace(/\s+/g, " ").trim();

    const chat = await cohere.chat({
      model: "command",
      message: `You are a professional resume analyzer. The following is plain text extracted from a PDF resume. It may not be perfectly formatted, so please ignore formatting issues and still analyze it carefully. Analyze this resume text and give specific, actionable suggestions on how the candidate can improve their resume to better match the job description. Focus on highlighting strengths and recommending additions or improvements that can help them secure the role. Keep the suggestions relevant to the job description. Write your response as a single concise paragraph of around 120 words, avoiding any bullet points or numbering.  ResumeData: ${cleanData} Jobdesc: ${jobdesc}`,
    });

    console.log(chat.text);

    return res.json({
      success: true,
      message: chat.text,
    });
  } catch (error) {
    handleError(error, "file upload error");
  }
};
