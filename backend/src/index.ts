import express, { Express, Request, Response } from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import logger from "morgan";
import passport from "passport";
import session from "express-session";
import genFunc from "connect-pg-simple";
import { Strategy as LocalStrategy } from "passport-local";
import prisma from "./lib/prisma";
import bcrypt from "bcryptjs";
import apiRouter from "./routes/base";
import { User } from "@prisma/client";
import path from "path";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
const FRONTEND_URL = process.env.FRONTEND_URL;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: FRONTEND_URL, credentials: true }));
app.use(logger("tiny"));
app.use("/api/uploads", express.static(path.join(__dirname, "..", "uploads")));
app.use(
  "/api/templates",
  express.static(path.join(__dirname, "..", "templates"))
);

// PassportJS setup
const PostgresqlStore = genFunc(session);
const sessionStore = new PostgresqlStore({
  conString: process.env.DATABASE_URL,
  createTableIfMissing: true,
});
app.use(
  session({
    secret: process.env.SECRET!,
    resave: false,
    saveUninitialized: false,
    // cookie: cookieOptions, // define cookieOptions
    store: sessionStore,
  })
);

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async function verify(email, password, cb) {
      const user = await prisma.user.findFirst({ where: { email } });
      if (!user) {
        cb(null, false, { message: "Incorrect email or password." });
        return;
      }
      if (!bcrypt.compareSync(password, user.password)) {
        cb(null, false, { message: "Incorrect email or password." });
        return;
      }
      return cb(null, user);
    }
  )
);

app.use(passport.initialize());
app.use(passport.authenticate("session"));

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

app.use("/api", apiRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
