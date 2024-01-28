import { Router } from "express";
import { login, signup, logout, getCurrentUser } from "../controllers/auth";

const authRouter = Router();

authRouter.post("/login", login);
authRouter.post("/signup", signup);
authRouter.post("/logout", logout);
authRouter.get("/current-user", getCurrentUser);

export default authRouter;
