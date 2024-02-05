import { RequestHandler } from "express";
import { body, param, validationResult } from "express-validator";
import prisma from "../lib/prisma";
import { session } from "passport";
import { Feedback, Registration, Session } from "@prisma/client";
import { differenceInMinutes } from "date-fns";

declare global {
  namespace Express {
    interface Request {
      registration?: Registration;
      feedback?: Feedback;
      sessionModel?: Session;
    }
  }
}

const validateSessionId: RequestHandler[] = [
  body("sessionId").isInt().notEmpty(),
  async (req, res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      res.status(400).send({ errors: result.array() });
      return;
    }
    const session = await prisma.session.findUnique({
      where: {
        id: parseInt(req.body.sessionId!),
      },
    });

    if (!session) {
      res.sendStatus(404);
      return;
    }
    req.sessionModel = session;
    next();
  },
];

const validateFeedbackId: RequestHandler[] = [
  param("id").isInt().notEmpty(),
  async (req, res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      res.status(400).send({ errors: result.array() });
      return;
    }
    const feedback = await prisma.feedback.findUnique({
      where: {
        id: parseInt(req.params.id!),
      },
    });
    if (!feedback) {
      res.sendStatus(404);
      return;
    }
    req.feedback = feedback;
    next();
  },
];

const validateRegistration: RequestHandler[] = [
  body("registrationId").isInt(),
  async (req, res, next) => {
    const { registrationId } = req.body;
    const registration = await prisma.registration.findUnique({
      where: { id: registrationId },
      include: { session: true },
    });
    if (!registration) {
      res.sendStatus(404);
      return;
    }
    req.registration = registration;
    next();
  },
];

const validateNumberOfMinutes: RequestHandler = (req, res, next) => {
  const { minutesServed } = req.body;
  const registration = req.registration!;
  const session = (registration as any).session as Session;
  const maxMinutes = differenceInMinutes(session.end, session.start);
  if (minutesServed > maxMinutes) {
    res.status(404).send({
      errors: [{ msg: "minutes should not be more than " + maxMinutes }],
    });
    return;
  }
  next();
};

export const show: RequestHandler[] = [
  ...validateFeedbackId,
  (req, res) => {
    res.json({ data: req.feedback! });
  },
];
export const create: RequestHandler[] = [
  body("userReflection").notEmpty(),
  body("actualFeedback").notEmpty(),
  body("minutesServed").isInt().notEmpty(),
  body("registrationId").isInt(),
  ...validateRegistration,
  validateNumberOfMinutes,
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      res.status(400).send({ errors: result.array() });
      return;
    }
    const { userReflection, actualFeedback, minutesServed, registrationId } =
      req.body;
    await prisma.feedback.create({
      data: {
        userReflection,
        actualFeedback,
        minutesServed,
        registrationId: registrationId,
      },
    });
    res.sendStatus(200);
  },
];
export const update: RequestHandler[] = [
  body("userReflection").notEmpty(),
  body("actualFeedback").notEmpty(),
  body("minutesServed").isInt().notEmpty(),
  ...validateFeedbackId,
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      res.status(400).send({ errors: result.array() });
      return;
    }
    const { userReflection, actualFeedback, minutesServed } = req.body;
    await prisma.feedback.update({
      where: {
        id: req.feedback!.id,
      },
      data: {
        userReflection,
        actualFeedback,
        minutesServed,
      },
    });
    res.sendStatus(200);
  },
];
