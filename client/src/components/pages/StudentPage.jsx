import React, { useState } from "react";
import axios from "axios";
import { load } from "@cashfreepayments/cashfree-js";
import StudentDetails from "../shared/context/StudentDetails";

const studentData = {
  name: "John Doe",
  id: "ST123456",
  feesRemaining: 500, // Assuming this is the remaining fees
};

const StudentPage = () => {
  const [orderId, setOrderId] = useState("");
  let cashfree;

  const initializeSDK = async () => {
    try {
      cashfree = await load({
        mode: "sandbox", // Set mode to 'sandbox' or 'production'
      });
    } catch (error) {
      console.error("Error initializing Cashfree SDK:", error);
    }
  };

  const getSessionId = async () => {
    try {
      let res = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/paymnet`);
      if (res.data && res.data.payment_session_id) {
        console.log(res.data);
        setOrderId(res.data.order_id);
        return res.data.payment_session_id;
      }
    } catch (error) {
      console.log("Error fetching session ID:", error);
    }
  };

  const verifyPayment = async () => {
    try {
      let res = await axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/verify`, {
        orderId: orderId,
      });
      if (res && res.data) {
        alert("Payment verified successfully!");
      }
    } catch (error) {
      console.log("Error verifying payment:", error);
    }
  };

  const handlePaymentClick = async (e) => {
    e.preventDefault();
    try {
      await initializeSDK();
      let sessionId = await getSessionId();

      let checkoutOptions = {
        paymentSessionId: sessionId,
        redirectTarget: "_modal",
      };

      cashfree.checkout(checkoutOptions).then((res) => {
        console.log("Payment initialized");
        verifyPayment(orderId);
      });
    } catch (error) {
      console.log("Payment error:", error);
    }
  };

  return (
    <>
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Student Fees Payment
        </h1>
        <div className="card text-center">
          <p className="text-lg text-gray-600 mb-6">
            Remaining Fees: <span className="font-semibold text-gray-800">${studentData.feesRemaining}</span>
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
  </>
  
  );
};

export default StudentPage;
