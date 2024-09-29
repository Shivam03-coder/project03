// Importing Cashfree SDK using ES6 import
import Cashfree from "cashfree-sdk";
import { generateOrderId } from "../utils/generateOrderId.js";
import { appconfig } from "../config/appconfig.js";

// Initialize Cashfree
Cashfree.init({
  env: "sandbox",
  apiKey: appconfig.CLIENT_ID,
  secretKey: appconfig.SECRET_KEY,
});

// Payment Controller using ES6 exports
export const paymentController = async (req, res) => {
  try {
    const request = {
      order_amount: 1.0,
      order_currency: "INR",
      order_id: generateOrderId(),
      customer_details: {
        customer_id: "webcodder01",
        customer_phone: "9999999999",
        customer_name: "Web Codder",
        customer_email: "webcodder@example.com",
      },
    };

    console.log("Creating Payment Order:", request);

    const response = await Cashfree.PG.createOrder(request); 

    console.log("Payment Order Created:", response.data);

    res.status(200).json(response.data);
  } catch (error) {
    console.error(
      "Error creating payment order:",
      error.response?.data?.message || error.message
    );
    res.status(500).json({
      error:
        error.response?.data?.message ||
        "An error occurred while creating the payment order",
    });
  }
};

// Payment verification controller using ES6 exports
export const verifyController = async (req, res) => {
  try {
    const { orderId } = req.body;

    console.log("Verifying Payment for Order ID:", orderId);

    const response = await Cashfree.PG.fetchPaymentStatus(orderId);

    console.log("Payment Verification Response:", response.data);

    res.status(200).json(response.data);
  } catch (error) {
    console.error(
      "Error verifying payment:",
      error.response?.data?.message || error.message
    );
    res.status(500).json({
      error:
        error.response?.data?.message ||
        "An error occurred while verifying the payment",
    });
  }
};
