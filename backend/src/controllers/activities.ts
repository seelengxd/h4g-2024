import { RequestHandler } from "express";
import prisma from "../lib/prisma";
import { body, param, validationResult } from "express-validator";
import { Activity, Organisation } from "@prisma/client";
import multer from "multer";

declare global {
  namespace Express {
    interface Request {
      organisation?: Organisation;
      activity?: Activity;
    }
  }
}

const upload = multer({ dest: "uploads/" });

const validateOrganisationId: RequestHandler[] = [
  async (req, res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      res.status(400).send({ errors: result.array() });
      return;
    }
    const organisation = await prisma.organisation.findFirst({
      where: { id: Number(req.body.organisationId!) },
    });
    if (!organisation) {
      res.sendStatus(404);
      return;
    }
    req.organisation = organisation;
    next();
  },
];

const validateActivityId: RequestHandler[] = [
  param("id").isInt().notEmpty(),
  async (req, res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      res.status(400).send({ errors: result.array() });
      return;
    }
    const activity = await prisma.activity.findUnique({
      where: {
        id: parseInt(req.params.id!),
      },
      include: {
        organisation: true,
        sessions: true,
        images: true,
        enrollmentForm: {
          include: { submissions: { include: { user: true } } },
        },
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

export const index: RequestHandler[] = [
  async (req, res) => {
    const activities = await prisma.activity.findMany({
      include: {
        sessions: true,
        images: true,
        organisation: { select: { name: true } },
      },
    });
    res.json({ data: activities.map((activity) => ({...activity, organisationName: activity.organisation.name})) });
  },
];

export const show: RequestHandler[] = [
  ...validateActivityId,
  async (req, res) => {
    res.json({ data: req.activity! });
  },
];

export const create: RequestHandler[] = [
  upload.array("images"),
  body("name").notEmpty().isString(),
  body("location").notEmpty().isString(),
  body("organisationId").notEmpty().isInt(),
  body("type").isIn(["VOLUNTEER", "WORKSHOP", "TRAINING"]), // Adjust as per your defined types
  body("sessions").notEmpty(),
  ...validateOrganisationId,
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      res.status(400).send({ errors: result.array() });
      return;
    }
    if (!req.files) {
      res.status(400).send({ errors: [{ msg: "missing images" }] });
      return;
    }
    const { name, type, sessions, description, location } = req.body;
    const newActivity = await prisma.activity.create({
      data: {
        name,
        organisationId: req.organisation!.id,
        type,
        description,
        location,
      },
    });

    await prisma.image.createMany({
      data: (req.files as Express.Multer.File[]).map((file) => ({
        imageUrl: file.path,
        activityId: newActivity.id,
      })),
    });

    const createdSessions = await prisma.session.createMany({
      data: JSON.parse(sessions).map(
        (date: { start: string; end: string }) => ({
          start: date.start,
          end: date.end,
          activityId: newActivity.id,
        })
      ),
    });
    res.sendStatus(200);
  },
];

// Note: this method is bug-prone for activity dates + update,
// especially once we add later relations. Be careful.
export const update: RequestHandler[] = [
  upload.array("images"),
  ...validateOrganisationId,
  ...validateActivityId,
  body("name").notEmpty().isString(),
  body("location").notEmpty().isString(),
  body("type").isIn(["VOLUNTEER", "WORKSHOP", "TRAINING"]), // Adjust as per your defined types
  body("sessions").notEmpty(),
  async (req, res) => {
    // 1. Update activity fields (except for sessions)
    const activity = req.activity!;

    const { name, type, description, location } = req.body;
    await prisma.activity.update({
      where: { id: activity.id },
      data: {
        name,
        organisationId: req.organisation!.id,
        type,
        description,
        location,
      },
    });

    if (!req.files) {
      res.status(400).send({ errors: [{ msg: "missing images" }] });
      return;
    }

    // just delete and re-add everything
    await prisma.image.deleteMany({ where: { activityId: activity.id } });

    await prisma.image.createMany({
      data: (req.files as Express.Multer.File[]).map((file) => ({
        imageUrl: file.path,
        activityId: activity.id,
      })),
    });

    // 2. Update old dates based on ID, create new dates (those without id.)
    const sessions: Array<{ start: string; end: string; id?: number }> =
      JSON.parse(req.body.sessions);

    // Postgres shouldn't allow a id of 0, right?
    const oldDates = sessions.filter((session) => !!session.id);
    const newDates = sessions.filter((session) => !session.id);

    const createdSessions = await prisma.session.createMany({
      data: newDates.map((date: { start: string; end: string }) => ({
        start: date.start,
        end: date.end,
        activityId: activity.id,
      })),
    });

    const updatePromises = oldDates.map(async (session) => {
      return prisma.session.update({
        where: { id: session.id },
        data: {
          start: session.start,
          end: session.end,
        },
      });
    });

    await Promise.all(updatePromises);

    res.sendStatus(200);
  },
];

export const destroy: RequestHandler[] = [
  ...validateActivityId,
  async (req, res) => {
    await prisma.session.deleteMany({
      where: {
        activityId: req.activity!.id,
      },
    });
    await prisma.activity.delete({ where: { id: req.activity!.id } });
    res.sendStatus(200);
  },
];
