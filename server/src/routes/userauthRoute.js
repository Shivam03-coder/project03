import { Router } from "express";

import {
  userregisterController,
  userloginController,
  userlogoutController,
  userpasswordChangeController,
} from "../controllers/index.js";

const Authroutes = Router();

// Public Routes

Authroutes.route("/signup").post(userregisterController);
Authroutes.route("/login").post(userloginController);
Authroutes.route("/logout").post(userlogoutController);
Authroutes.route("/passwordchange").post(userpasswordChangeController);
export { Authroutes };
