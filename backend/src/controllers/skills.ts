import { RequestHandler } from "express";
import prisma from "../lib/prisma";

export const index: RequestHandler[] = [
  async (req, res) => {
    const skills = await prisma.skill.findMany();
    //console.log(skills);
    res.json({ data: skills });
  },
];
