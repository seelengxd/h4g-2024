import { RequestHandler } from "express";
import prisma from "../lib/prisma";
import { body, param, validationResult } from "express-validator";
import { Activity, Organisation } from "@prisma/client";

declare global {
  namespace Express {
    interface Request {
      organisation?: Organisation;
      activity?: Activity;
    }
  }
}

const validateOrganisationId: RequestHandler[] = [
  body("organisationId").isInt().notEmpty(),
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
        organisation: true,
        sessions: true,
      },
    });
    res.json({ data: activities });
  },
];

export const show: RequestHandler[] = [
  ...validateActivityId,
  async (req, res) => {
    res.json({ data: req.activity! });
  },
];

export const create: RequestHandler[] = [
  body("name").notEmpty().isString(),
  body("location").notEmpty().isString(),
  body("organisationId").notEmpty().isInt(),
  body("type").isIn(["VOLUNTEER", "WORKSHOP", "TRAINING"]), // Adjust as per your defined types
  body("sessions").isArray(),
  body("sessions.*.start").optional().isISO8601().toDate(),
  body("sessions.*.end").optional().isISO8601().toDate(),
  ...validateOrganisationId,
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      res.status(400).send({ errors: result.array() });
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

    const createdSessions = await prisma.session.createMany({
      data: sessions.map((date: { start: string; end: string }) => ({
        start: date.start,
        end: date.end,
        activityId: newActivity.id,
      })),
    });
    res.sendStatus(200);
  },
];

// Note: this method is bug-prone for activity dates + update,
// especially once we add later relations. Be careful.
export const update: RequestHandler[] = [
  ...validateOrganisationId,
  ...validateActivityId,
  body("name").notEmpty().isString(),
  body("location").notEmpty().isString(),
  body("organisationId").notEmpty().isInt(),
  body("type").isIn(["VOLUNTEER", "WORKSHOP", "TRAINING"]), // Adjust as per your defined types
  body("sessions").isArray(),
  body("sessions.*.start").isISO8601().toDate(),
  body("sessions.*.end").isISO8601().toDate(),
  body("sessions.*.id").optional().isInt(),
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

    // 2. Update old dates based on ID, create new dates (those without id.)
    const sessions: Array<{ start: string; end: string; id?: number }> =
      req.body.sessions;

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
