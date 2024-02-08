import { RequestHandler } from "express";
import { body, param, validationResult } from "express-validator";
import prisma from "../lib/prisma";
import { User } from "@prisma/client";

// This is user specific.
export const index: RequestHandler = async (req, res) => {
  const registrations = await prisma.registration.findMany({
    where: { userId: (req.user! as User).id },
    include: {
      feedback: true,
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

export const show: RequestHandler[] = [
  param("id").isInt().notEmpty(),
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      res.status(400).send({ errors: result.array() });
      return;
    }
    const registration = await prisma.registration.findUnique({
      where: {
        id: parseInt(req.params.id!),
      },
      include: {
        feedback: {
          include: {
            registration: {
              include: { session: true },
            },
          },
        },
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

    if (!registration) {
      res.sendStatus(404);
      return;
    }

    return res.json({ data: registration });
  },
];

// Assumptions: User cannot register multiple times.
// I assume they have not registered for this event at all.
export const create: RequestHandler[] = [
  body("sessionIds").isArray(),
  body("sessionIds.*").isInt(),
  async (req, res) => {
    // TODO: check submission ID. should be optional field
    const { sessionIds, enrollmentFormId, submissionId } = req.body;
    await prisma.registration.createMany({
      data: (sessionIds as number[]).map((id) => ({
        ...(enrollmentFormId ? { ...enrollmentFormId } : {}),
        sessionId: id,
        userId: (req.user! as User).id,
        ...(submissionId ? { submissionId: parseInt(submissionId) } : {}),
      })),
    });
    res.sendStatus(200);
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
      },
    });

    const registrations = await prisma.registration.findMany({
      where: {
        sessionId: Number(sessionId),
      },
      include: {
        user: true,
      },
    });

    console.log(registrations);

    res.json({ data: registrations });
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
      },
    });

    const registrations = await prisma.registration.findMany({
      where: {
        sessionId: Number(sessionId),
      },
      include: {
        user: true,
      },
    });

    console.log(registrations);

    res.json({ data: registrations });
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
      },
    });

    const registrations = await prisma.registration.findMany({
      where: {
        sessionId: Number(sessionId),
      },
      include: {
        user: true,
      },
    });

    console.log(registrations);

    res.json({ data: registrations });
  },
];
