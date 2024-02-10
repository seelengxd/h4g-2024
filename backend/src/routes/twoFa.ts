import { Router } from "express";
import {
  auth,
  deleteTwoFaSession,
  getUserInfo,
  hasTwoFaSession,
  redirect,
  setTwoFaPreference,
} from "../controllers/twoFa";

const twoFaRouter = Router();

twoFaRouter.get("/auth-url", auth);
twoFaRouter.get("/redirect", redirect);
twoFaRouter.get("/user-info", getUserInfo);
twoFaRouter.get("/has-two-fa-session", hasTwoFaSession);
twoFaRouter.post("/reset-two-fa-session", deleteTwoFaSession);
twoFaRouter.post("/set-two-fa-preference", setTwoFaPreference);

export default twoFaRouter;
