import { RequestHandler } from "express";
import { body } from "express-validator";
import prisma from "../lib/prisma";
import { User } from "@prisma/client";

// This is user specific.
export const index: RequestHandler = async (req, res) => {
  const registrations = await prisma.registration.findMany({
    where: { userId: (req.user! as User).id },
    include: {
      session: {
        include: {
          activity: {
            include: {
              organisation: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        },
      },
    },
  });
  return res.json({ data: registrations });
};

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

export const markAttended: RequestHandler[] = [
  body("id").isInt(),
  body("sessionId").isInt(),
  async (req, res) => {
    const { id, sessionId } = req.body;
    await prisma.registration.update({
      where: {
        id: Number(id),
      },
      data: {
        attendance: true,
      }
    });

    const registrations = await prisma.registration.findMany({
      where: {
        sessionId: Number(sessionId),
      },
      include: {
        user: true,
      }
    });
    
    console.log(registrations);

    res.json({data: registrations});
  },
];

export const markAbsent: RequestHandler[] = [
  body("id").isInt(),
  body("sessionId").isInt(),
  async (req, res) => {
    const { id, sessionId } = req.body;
    const registration = await prisma.registration.update({
      where: {
        id: Number(id),
      },
      data: {
        attendance: false,
      }
    });

    const registrations = await prisma.registration.findMany({
      where: {
        sessionId: Number(sessionId),
      },
      include: {
        user: true,
      }
    });

    console.log(registrations);

    res.json({data: registrations});
  },
];

export const unmark: RequestHandler[] = [
  body("id").isInt(),
  body("sessionId").isInt(),
  async (req, res) => {
    const { id, sessionId } = req.body;
    const registration = await prisma.registration.update({
      where: {
        id: Number(id),
      },
      data: {
        attendance: null,
      }
    });

    const registrations = await prisma.registration.findMany({
      where: {
        sessionId: Number(sessionId),
      },
      include: {
        user: true,
      }
    });

    console.log(registrations);

    res.json({data: registrations});
  },
];
