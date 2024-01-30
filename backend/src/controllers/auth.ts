import { RequestHandler } from "express";
import { Prisma, User } from "@prisma/client";
import { body, validationResult } from "express-validator";
import passport from "passport";
import bcrypt from "bcryptjs";
import prisma from "../lib/prisma";

export const login: RequestHandler = (req, res, next) => {
  passport.authenticate("local", function (err: Error, user: User) {
    if (err) return next(err);
    if (!user) {
      return res.sendStatus(401);
    }
    req.login(user, function (err) {
      if (err) {
        return next(err);
      }
      const { password, ...userWithoutPassword } = user;
      res.json({ user: userWithoutPassword });
    });
  })(req, res, next);
};

export const signup: RequestHandler[] = [
  body("username").notEmpty(),
  body("password")
    .notEmpty()
    .isLength({ min: 8 })
    .withMessage("Password should have length of at least 8."),
  body("confirmPassword")
    .notEmpty()
    .withMessage("Confirmation password cannot be empty.")
    .custom((value, { req }) => value === req.body.password)
    .withMessage("Password does not match confirmation password."),
  body("email")
    .notEmpty()
    .isEmail()
    .withMessage("Email should be a valid email."),
  async (req, res) => {
    const result = validationResult(req);
    if (!validationResult(req).isEmpty()) {
      res.send({ errors: validationResult(req).array() });
      return;
    }
    const { username, password, email } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);
    try {
      const newUser = await prisma.user.create({
        data: {
          username,
          password: hashedPassword,
          email,
        },
      });
    } catch (err) {
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === "P2002"
      ) {
        res.status(409).json({
          errors: [
            { msg: `${err.meta?.target} is already taken by another user.` },
          ],
        });
      }
      return;
    }
    res.sendStatus(200);
  },
];

export const logout: RequestHandler = async (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.sendStatus(200);
  });
};

export const getCurrentUser: RequestHandler = (req, res) => {
  if (req.user === undefined) {
    res.sendStatus(401);
  } else {
    const { password, ...userWithoutPassword } = req.user as User;
    res.json({ user: userWithoutPassword });
  }
};
