import { RequestHandler } from "express";
import { body, param, validationResult } from "express-validator";
import prisma from "../lib/prisma";
import { User } from "@prisma/client";
import { format } from "date-fns";
import { createCertificate } from "../utils/certificate";
import path from "path";

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
        user: {
          select: {
            id: true,
            fullName: true,
            preferredName: true,
            email: true,
            role: true,
            phone: true,
          },
        },
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
        user: {
          select: {
            id: true,
            fullName: true,
            preferredName: true,
            email: true,
            role: true,
            phone: true,
          },
        },
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
        user: {
          select: {
            id: true,
            fullName: true,
            preferredName: true,
            email: true,
            role: true,
            phone: true,
          },
        },
      },
    });

    console.log(registrations);

    res.json({ data: registrations });
  },
];

export const getCertificate: RequestHandler[] = [
  param("id").isInt(),
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      res.status(400).send({ errors: result.array() });
      return;
    }
    const { id } = req.params;
    const registration = await prisma.registration.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!registration) {
      res.sendStatus(404);
      return;
    }

    const session = await prisma.session.findFirst({
      where: {
        registrations: {
          some: {
            id: registration.id,
          },
        },
      },
    });

    if (!session) {
      res.sendStatus(404);
      return;
    }

    const activity = await prisma.activity.findFirst({
      where: {
        sessions: {
          some: {
            id: session.id,
          },
        },
      },
    });

    if (!registration?.attendance || !activity) {
      res.sendStatus(404);
      return;
    }

    const formattedDate =
      format(new Date(session.start), "EEEE d MMMM, hh:mma-") +
      (new Date(session!.start).getDay() === new Date(session!.end).getDay()
        ? format(new Date(session!.end), "hh:mma")
        : format(new Date(session!.end), " d MMM, hh:mma"));

    const certificate_name = await createCertificate(
      activity,
      (req.user as User)!,
      formattedDate
    );

    res.redirect("/api/uploads/" + `${certificate_name}.pdf`);
  },
];
