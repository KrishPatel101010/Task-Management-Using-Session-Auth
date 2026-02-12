import express, { Router } from "express";
import {
  signUpController,
  loginController,
  logoutController,
} from "../controllers/index.ts";
import { sessionAuth } from "../middlewares/sessionAuth.ts";

const router: Router = express.Router();

router.post("/signup", signUpController);
router.post("/login", loginController);
router.post("/logout", sessionAuth, logoutController);

export default router;
