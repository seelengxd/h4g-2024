import { RequestHandler } from "express";
import prisma from "../lib/prisma";
import { Role } from "@prisma/client";
import { param, validationResult } from "express-validator";

export const index: RequestHandler = async (req, res) => {
  const volunteers = await prisma.user.findMany({
    where: {
      role: Role.USER,
    },
  });

  await res.json({ data: volunteers });
};

export const show: RequestHandler[] = [
  param("id").notEmpty().isInt(),
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      res.status(400).send({ errors: result.array() });
      return;
    }

    const volunteer = await prisma.user.findUnique({
      where: {
        role: Role.USER,
        id: parseInt(req.params.id)!,
      },
      include: {
        profile: {
          include: {
            skills: true,
            interests: true,
          },
        },
        registrations: {
          include: {
            feedback: true,
            session: {
              include: {
                activity: {
                  include: {
                    organisation: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    console.log(volunteer);

    if (!volunteer) {
      res.sendStatus(404);
      return;
    }

    await res.json({ data: volunteer });
  },
];
