import { RequestHandler } from "express";
import prisma from "../lib/prisma";

export const index: RequestHandler[] = [
  async (req, res) => {
    const interests = await prisma.interest.findMany();
    res.json({ data: interests });
  },
];
