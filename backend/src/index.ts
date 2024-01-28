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
import authRouter from "./routes/auth";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(logger("tiny"));

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
  new LocalStrategy(async function verify(username, password, cb) {
    const user = await prisma.user.findFirst({ where: { username } });
    if (!user) {
      cb(null, false, { message: "Incorrect username or password." });
      return;
    }
    if (!bcrypt.compareSync(password, user.password)) {
      cb(null, false, { message: "Incorrect username or password." });
      return;
    }
    return cb(null, user);
  })
);
app.use(passport.authenticate("session"));

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.use("/auth", authRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
