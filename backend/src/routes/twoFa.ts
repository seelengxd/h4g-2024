import { Router } from "express";
import { auth, hasTwoFaSession, redirect } from "../controllers/twoFa";

const twoFaRouter = Router();

twoFaRouter.get("/auth-url", auth);
twoFaRouter.get("/redirect", redirect);
twoFaRouter.get("/has_two_fa_session", hasTwoFaSession);

export default twoFaRouter;
