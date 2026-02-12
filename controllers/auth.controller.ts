import { signUpService, loginService } from "../services/auth.services.ts";
import type { Request, Response } from "express";

export const signUpController = async (req: Request, res: Response) => {
  try {
    const newUser = await signUpService(req.body);
    req.session.userId = newUser._id.toString();
    return res.status(201).json({ message: "Sign Up successfully." });
  } catch (error) {
    return res.status(400).json({ error: (error as Error).message });
  }
};

export const loginController = async (req: Request, res: Response) => {
  try {
    const user =  await loginService(req.body);
    req.session.userId = user._id.toString();
    return res
      .status(200)
      .json({ message: "Login successfully."});
  } catch (error) {
    return res.status(400).json({ error: (error as Error).message });
  }
};

export const logoutController = (req: Request, res: Response) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ error: "Logout failed." });
      }
      res.clearCookie("taskmanager.sid");
      return res.status(200).json({ message: "Logout successfully." });
    });
  } catch (error) {
    return res.status(400).json({ error: (error as Error).message });
  }
};
