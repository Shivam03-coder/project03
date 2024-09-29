import { Router } from "express";
import { paymentController, verifyController } from "../controllers/payentController.js";

export const paymnetRoutes = Router();

paymnetRoutes.route("/payment").post(paymentController);
paymnetRoutes.route("/verify").post(verifyController);
