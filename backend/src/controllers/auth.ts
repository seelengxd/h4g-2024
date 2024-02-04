import { RequestHandler } from "express";
import { Prisma, User } from "@prisma/client";
import { body, matchedData, query, validationResult } from "express-validator";
import passport from "passport";
import bcrypt from "bcryptjs";
import prisma from "../lib/prisma";
import transporter, {
  generateTemporaryToken,
  verifyTemporaryToken,
} from "../utils/nodemailer";

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
  body("fullName").notEmpty(),
  body("preferredName").notEmpty(),
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
    if (!result.isEmpty()) {
      res.send({ errors: result.array() });
      return;
    }
    const { fullName, preferredName, password, email } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);
    try {
      const newUser = await prisma.user.create({
        data: {
          fullName,
          preferredName,
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

export const sendResetEmail: RequestHandler[] = [
  body("email").notEmpty().isEmail(),
  async (req, res) => {
    if (!validationResult(req).isEmpty()) {
      res.status(400).json({ errors: validationResult(req).array() });
      return;
    }

    const { email } = matchedData(req);

    try {
      const user = await prisma.user.findUnique({ where: { email } });

      if (!user) {
        res.status(404).json({ errors: [{ msg: "User not found." }] });
        return;
      }

      const resetToken = generateTemporaryToken(email);
      const mailOptions = {
        from: process.env.GMAIL_USER,
        to: email,
        subject: "Hack 4 Good - Password Reset",
        text: `Hi ${user.preferredName},
        
        Click the link below to reset your password: ${process.env.FRONTEND_URL}/reset-password?token=${resetToken}
        If you did not make this request - ignore this email. No action is required.
        `,
      };

      transporter.sendMail(mailOptions, (error: Error | null, info: any) => {
        if (error) {
          console.error(error);
          res.status(500).json({ errors: [{ msg: "Internal Server Error" }] });
        } else {
          console.log("Email sent: " + info.response);
          res
            .status(200)
            .json({ message: "Password reset link sent successfully." });
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ errors: [{ msg: "Internal Server Error" }] });
    }
  },
];

export const resetPassword: RequestHandler[] = [
  query("token").notEmpty(),
  body("password")
    .notEmpty()
    .isLength({ min: 8 })
    .withMessage("Password should have length of at least 8."),
  async (req, res) => {
    if (!validationResult(req).isEmpty()) {
      res.status(400).json({ errors: validationResult(req).array() });
      return;
    }

    const { password } = matchedData(req);
    const { token } = req.query;

    try {
      const isValidToken = await verifyTemporaryToken(token as string);

      if (!isValidToken) {
        const errorMessage = "Invalid token: Unable to verify token.";
        console.error(errorMessage);
        res.status(400).json({ errors: [{ msg: errorMessage }] });
        return;
      }

      const user = await prisma.user.findFirst({
        where: { email: isValidToken.email },
      });

      if (!user) {
        res.status(400).json({ errors: [{ msg: "User not found." }] });
        return;
      }

      const hashedPassword = bcrypt.hashSync(password);
      await prisma.user.update({
        where: { id: user.id },
        data: { password: hashedPassword },
      });

      res.status(200).json({ message: "Password reset successful." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ errors: [{ msg: "Internal Server Error" }] });
    }
  },
];
