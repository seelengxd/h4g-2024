import { Role, User } from "@prisma/client";
import { RequestHandler } from "express";

export const requireLogin: RequestHandler = (req, res, next) => {
  if (req.isUnauthenticated()) {
    return res.sendStatus(401);
  }
  next();
};

export const requireAdmin: RequestHandler[] = [
  requireLogin,
  (req, res, next) => {
    const user = req.user as User;
    if (user.role == Role.USER) {
      return res.sendStatus(403);
    }
    next();
  },
];
