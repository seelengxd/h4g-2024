import { RequestHandler } from "express";
import prisma from "../lib/prisma";
import { body, param, validationResult } from "express-validator";
import { Activity, EnrollmentForm } from "@prisma/client";

declare global {
  namespace Express {
    interface Request {
      enrollmentForm?: EnrollmentForm;
      activity?: Activity;
    }
  }
}

const validateActivityId: RequestHandler[] = [
  body("activityId").isInt().notEmpty(),
  async (req, res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      res.status(400).send({ errors: result.array() });
      return;
    }
    const activity = await prisma.activity.findUnique({
      where: {
        id: parseInt(req.body.activityId!),
      },
      include: {
        organisation: true,
        sessions: true,
      },
    });
    if (!activity) {
      res.sendStatus(404);
      return;
    }
    req.activity = activity;
    next();
  },
];

const validateEnrollmentFormId: RequestHandler[] = [
  param("id").isInt().notEmpty(),
  async (req, res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      res.status(400).send({ errors: result.array() });
      return;
    }
    const enrollmentForm = await prisma.enrollmentForm.findUnique({
      where: {
        id: parseInt(req.params.id!),
      },
    });
    if (!enrollmentForm) {
      res.sendStatus(404);
      return;
    }
    req.enrollmentForm = enrollmentForm;
    next();
  },
];

export const show: RequestHandler[] = [
  ...validateEnrollmentFormId,
  async (req, res) => {
    res.json({ data: req.enrollmentForm! });
  },
];

export const create: RequestHandler[] = [
  ...validateActivityId,
  body("formSchema").notEmpty(),
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      res.status(400).send({ errors: result.array() });
      return;
    }
    const { formSchema } = req.body;
    const enrollmentForm = await prisma.enrollmentForm.findUnique({
      where: {
        activityId: req.activity!.id,
      },
    });
    if (enrollmentForm !== null) {
      res.sendStatus(409);
      return;
    }
    const newEnrollmentForm = await prisma.enrollmentForm.create({
      data: {
        formSchema,
        activityId: req.activity!.id,
      },
    });

    res.sendStatus(200);
  },
];

export const update: RequestHandler[] = [
  ...validateEnrollmentFormId,
  body("formSchema").notEmpty().isJSON(),
  async (req, res) => {
    const enrollmentForm = req.enrollmentForm!;

    const { formSchema } = req.body;
    await prisma.enrollmentForm.update({
      where: { id: enrollmentForm.id },
      data: {
        formSchema,
      },
    });

    res.sendStatus(200);
  },
];

export const destroy: RequestHandler[] = [
  ...validateEnrollmentFormId,
  async (req, res) => {
    // TODO: This will error if there are "registrations". Look into this later.
    await prisma.submission.deleteMany({
      where: {
        enrollmentFormId: req.enrollmentForm!.id,
      },
    });
    await prisma.enrollmentForm.delete({
      where: { id: req.enrollmentForm!.id },
    });
    res.sendStatus(200);
  },
];
