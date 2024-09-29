import { Router } from "express";
import { paymnetcontroller, verifycontroller } from "../controllers/payentController.js";

export const paymnetRoutes = Router();

paymnetRoutes.route("/paymnet").post(paymnetcontroller);
paymnetRoutes.route("/verify").post(verifycontroller);
