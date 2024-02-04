import { Router } from "express";
import {
  login,
  signup,
  logout,
  getCurrentUser,
  resetPassword,
  sendResetEmail,
} from "../controllers/auth";

const authRouter = Router();

authRouter.post("/login", login);
authRouter.post("/signup", signup);
authRouter.post("/logout", logout);
authRouter.get("/current-user", getCurrentUser);
authRouter.post("/send-reset-email", sendResetEmail);
authRouter.post("/reset-password", resetPassword);

export default authRouter;
