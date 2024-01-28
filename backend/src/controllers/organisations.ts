import { RequestHandler } from "express";
import prisma from "../lib/prisma";
import { body, param, validationResult } from "express-validator";
import multer from "multer";

const validateId = param("id").isInt().notEmpty();
const upload = multer({ dest: "uploads/" });

export const index: RequestHandler = async (req, res) => {
  const organisations = await prisma.organisation.findMany();
  res.json({ data: organisations });
};

export const show: RequestHandler[] = [
  validateId,
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      res.sendStatus(400);
      return;
    }
    const organisation = await prisma.organisation.findFirst({
      where: { id: Number(req.params.id!) },
    });
    if (!organisation) {
      res.sendStatus(404);
      return;
    }
    res.json({ data: organisation });
  },
];

export const create: RequestHandler[] = [
  upload.single("image"),
  body("name").notEmpty().withMessage("Name cannot be empty."),
  body("description").notEmpty().withMessage("Name cannot be empty."),
  body("websiteUrl").isURL().withMessage("Invalid URL provided."),
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      res.status(400).send(result.array());
      return;
    }
    console.log(req.file);
    const { name, description, websiteUrl } = req.body;
    const newOrganisation = await prisma.organisation.create({
      data: {
        name,
        description,
        website_url: websiteUrl,
        image_url: req.file?.path,
      },
    });
    res.sendStatus(200);
  },
];

export const update: RequestHandler[] = [
  validateId,
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      res.sendStatus(400);
      return;
    }
    const organisation = await prisma.organisation.findFirst({
      where: { id: Number(req.params.id!) },
    });
    const { name, description, websiteUrl } = req.body;
    if (!organisation) {
      res.sendStatus(404);
      return;
    }
    const newOrganisation = await prisma.organisation.update({
      where: { id: organisation.id },
      data: {
        name,
        description,
        website_url: websiteUrl,
        image_url: req.file?.path,
      },
    });
    res.sendStatus(200);
  },
];

export const destroy: RequestHandler[] = [
  validateId,
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      res.sendStatus(400);
      return;
    }
    const organisation = await prisma.organisation.findFirst({
      where: { id: Number(req.params.id!) },
    });
    if (!organisation) {
      res.sendStatus(404);
      return;
    }
    await prisma.organisation.delete({ where: { id: organisation.id } });
    res.sendStatus(200);
  },
];
