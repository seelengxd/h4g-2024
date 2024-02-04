import { RequestHandler } from "express";
import { body } from "express-validator";
import prisma from "../lib/prisma";
import { User } from "@prisma/client";

// Assumptions: User cannot register multiple times.
// I assume they have not registered for this event at all.
export const create: RequestHandler[] = [
  body("sessionIds").isArray(),
  body("sessionIds.*").isInt(),
  async (req, res) => {
    const { sessionIds } = req.body;
    await prisma.registration.createMany({
      data: (sessionIds as number[]).map((id) => ({
        sessionId: id,
        userId: (req.user! as User).id,
      })),
    });
    res.sendStatus(200);
  },
];

// For attendance (later)
export const update: RequestHandler[] = [
  body("registrations").isArray(),
  async (req, res) => {
    // TODO
  },
];
