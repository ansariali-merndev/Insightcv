import Swal from "sweetalert2";
import { loadScript } from "../lib/razorpay";
import { handleRazorpayOrder, handleRazorpayVerify } from "../lib/axios";

export const SubscriptionCard = () => {
  const displayRazorpay = async (id) => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      return Swal.fire({
        text: "Razorpay failed, Please check your Internet connection",
        showConfirmButton: false,
        timer: 2000,
      });
    }

    const resAxios = await handleRazorpayOrder({
      subscription_id: id,
    });

    if (!resAxios.success) {
      return Swal.fire({
        title: "Payment Subcription failed",
        text: "Please try later",
        icon: "question",
      });
    }

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: resAxios.message.amount,
      currency: resAxios.message.currency,
      order_id: resAxios.message.id,
      name: "InsightCV",
      description: "Subscription Payment",
      handler: async function (response) {
        // console.log("Payment response:", response);

        try {
          const verifyRes = await handleRazorpayVerify(response);
          //   console.log(verifyRes);
          if (verifyRes.success) {
            return Swal.fire({
              icon: "success",
              title: "Payment Successful",
              timer: 2000,
              showConfirmButton: false,
            });
          }

          Swal.fire({
            icon: "warning",
            title: "Payment failed",
            timer: 2000,
            showConfirmButton: false,
          });
        } catch (error) {
          Swal.fire({
            icon: "warning",
            title: "Payment failed",
            timer: 2000,
            showConfirmButton: false,
          });
        }
      },
      theme: { color: "#6366f1" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 max-w-4xl mx-auto">
      {/* Essential */}
      <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-shadow duration-300 border border-gray-200">
        <h2 className="text-2xl font-bold mb-2 text-center text-gray-800">
          Essential Subscription
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Start your journey today
        </p>
        <ul className="mb-6 list-disc list-inside text-gray-600 space-y-2">
          <li>Upload 2 resumes for insights</li>
          <li>Get smart suggestions instantly</li>
          <li>Improve CV with small cost</li>
        </ul>
        <hr className="mb-6 border-t" />
        <button
          onClick={() => displayRazorpay("essential")}
          className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors duration-300"
        >
          Choose Plan &#8377;9
        </button>
        <p className="text-center text-xs text-gray-400 mt-4">
          One-time payment, valid some days
        </p>
      </div>

      {/* Premium */}
      <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-shadow duration-300 border border-purple-300 relative">
        <div className="absolute -top-4 right-4 bg-purple-600 text-white text-xs px-3 py-1 rounded-full shadow">
          Most Popular
        </div>
        <h2 className="text-2xl font-bold mb-2 text-center text-gray-800">
          Premium Subscription
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Best for serious growth
        </p>
        <ul className="mb-6 list-disc list-inside text-gray-600 space-y-2">
          <li>Unlimited uploads, lifetime access</li>
          <li>Powerful suggestions every time</li>
          <li>One-time pay, forever upgrade</li>
        </ul>
        <hr className="mb-6 border-t" />
        <button
          onClick={() => displayRazorpay("premium")}
          className="block w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition-colors duration-300"
        >
          Choose Plan &#8377;49
        </button>
        <p className="text-center text-xs text-gray-400 mt-4">
          100% satisfaction or money back
        </p>
      </div>
    </section>
  );
};
