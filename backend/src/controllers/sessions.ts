import { RequestHandler } from "express";
import prisma from "../lib/prisma";
import { param, validationResult } from "express-validator";

export const show: RequestHandler[] = [
  param("id").isInt().notEmpty(),
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      res.status(400).send({ errors: result.array() });
      return;
    }
    const session = await prisma.session.findUnique({
      where: {
        id: parseInt(req.params.id!),
      },
      include: {
        activity: {
          include: {
            enrollmentForm: true,
            organisation: {
              select: {
                name: true,
              },
            },
          },
        },
        registrations: {
          include: {
            user: true,
            submission: { include: { user: true } },
          },
        },
      },
    });

    if (!session) {
      res.sendStatus(404);
      return;
    }

    const sessionEntity = {
      ...session,
      activity: {
        ...session.activity,
        organisationName: session.activity.organisation.name,
      },
    };

    return res.json({ data: sessionEntity });
  },
];
