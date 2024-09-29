import React, { useState } from "react";
import axios from "axios";
import { load } from "@cashfreepayments/cashfree-js";

const studentData = {
  name: "John Doe",
  id: "ST123456",
  feesRemaining: 500, 
};

const StudentPage = () => {
  const [orderId, setOrderId] = useState("");
  const [cashfree, setCashfree] = useState(null);

  const initializeSDK = async () => {
    try {
      const cashfreeInstance = await load({
        mode: "sandbox",
      });
      setCashfree(cashfreeInstance);
    } catch (error) {
      console.error("Error initializing Cashfree SDK:", error);
      alert("Failed to initialize payment. Please try again.");
    }
  };

  const getSessionId = async () => {
    try {
      let res = await axios.post(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/payment`
      );
      if (res.data && res.data.payment_session_id) {
        console.log("Session ID:", res.data);
        setOrderId(res.data.order_id);
        return res.data.payment_session_id;
      } else {
        throw new Error("Failed to fetch session ID.");
      }
    } catch (error) {
      console.log("Error fetching session ID:", error);
      alert("Failed to start payment session. Please try again.");
      return null;
    }
  };

  const verifyPayment = async () => {
    try {
      let res = await axios.post(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/verify`,
        {
          orderId,
        }
      );
      if (res && res.data) {
        alert("Payment verified successfully!");
      } else {
        throw new Error("Payment verification failed.");
      }
    } catch (error) {
      console.log("Error verifying payment:", error);
      alert("Payment verification failed. Please try again.");
    }
  };

  const handlePaymentClick = async (e) => {
    e.preventDefault();
    try {
      await initializeSDK();
      let sessionId = await getSessionId();

      if (!cashfree || !sessionId) {
        throw new Error("Payment initialization failed.");
      }

      let checkoutOptions = {
        paymentSessionId: sessionId,
        redirectTarget: "_modal",
      };

      cashfree.checkout(checkoutOptions).then((res) => {
        console.log("Payment initialized");
        verifyPayment();
      });
    } catch (error) {
      console.log("Payment error:", error);
      alert("An error occurred during payment. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Student Fees Payment
        </h1>
        <div className="card text-center">
          <p className="text-lg text-gray-600 mb-6">
            Remaining Fees:{" "}
            <span className="font-semibold text-gray-800">
              ${studentData.feesRemaining}
            </span>
          </p>
          <button
            onClick={handlePaymentClick}
            className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-all duration-300"
          >
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentPage;
