import { Router } from "express";
import { login, signup, logout } from "../controllers/auth";
import passport from "passport";
import prisma from "../lib/prisma";
import { User } from "@prisma/client";

const authRouter = Router();

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, (user as User).id);
  });
});

passport.deserializeUser(function (userId: number, cb) {
  process.nextTick(async function () {
    const user = await prisma.user.findFirstOrThrow({ where: { id: userId } });
    return cb(null, user);
  });
});

authRouter.post("/login", login);
authRouter.post("/signup", signup);
authRouter.post("/logout", logout);

export default authRouter;
