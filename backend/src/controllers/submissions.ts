import { RequestHandler } from "express";
import prisma from "../lib/prisma";
import { body, param, validationResult } from "express-validator";
import { EnrollmentForm, Submission, User } from "@prisma/client";

declare global {
  namespace Express {
    interface Request {
      enrollmentForm?: EnrollmentForm;
      submission?: Submission;
    }
  }
}

const validateEnrollmentFormId: RequestHandler[] = [
  body("enrollmentFormId").isInt().notEmpty(),
  async (req, res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      res.status(400).send({ errors: result.array() });
      return;
    }
    const enrollmentForm = await prisma.enrollmentForm.findUnique({
      where: {
        id: parseInt(req.body.enrollmentFormId!),
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

const validateSubmissionId: RequestHandler[] = [
  param("id").isInt().notEmpty(),
  async (req, res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      res.status(400).send({ errors: result.array() });
      return;
    }
    const submission = await prisma.submission.findUnique({
      where: {
        id: parseInt(req.params.id!),
      },
    });
    if (!submission) {
      res.sendStatus(404);
      return;
    }
    req.submission = submission;
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
  ...validateEnrollmentFormId,
  body("answer").notEmpty(),
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      res.status(400).send({ errors: result.array() });
      return;
    }
    const { answer } = req.body;
    const enrollmentForm = await prisma.submission.findUnique({
      where: {
        enrollmentFormId_userId: {
          enrollmentFormId: req.enrollmentForm!.id,
          userId: (req.user! as unknown as User).id,
        },
      },
      include: {
        user: true,
      },
    });
    if (enrollmentForm !== null) {
      res.sendStatus(409);
      return;
    }
    const newSubmission = await prisma.submission.create({
      data: {
        answer: answer,
        userId: (req.user! as User).id,
        enrollmentFormId: req.enrollmentForm!.id,
      },
    });

    res.send({ data: newSubmission });
  },
];

export const update: RequestHandler[] = [
  ...validateSubmissionId,
  body("answer").notEmpty().isJSON(),
  async (req, res) => {
    const submission = req.submission!;

    const { answer } = req.body;
    await prisma.submission.update({
      where: { id: submission.id },
      data: {
        answer,
      },
    });

    res.sendStatus(200);
  },
];

export const destroy: RequestHandler[] = [
  ...validateSubmissionId,
  async (req, res) => {
    await prisma.submission.delete({
      where: {
        id: req.submission!.id,
      },
    });
    res.sendStatus(200);
  },
];
