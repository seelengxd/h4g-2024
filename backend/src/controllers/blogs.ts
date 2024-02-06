import { RequestHandler } from "express";
import prisma from "../lib/prisma";
import { body, param, validationResult } from "express-validator";
import multer from "multer";

const validateId = param("id").isInt().notEmpty();
const upload = multer({ dest: "./uploads/" });

//to show all 
export const index: RequestHandler = async (req, res) => {
    const blogs = await prisma.blog.findMany({
        include: {likes: true, tags: true, user: true}
    });
    res.json({data: blogs});
}

//to show specific
export const show: RequestHandler[] = [
    validateId,
    async (req, res) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            res.status(400).send({ errors: result.array() });
            return;
        }

        const blog = await prisma.blog.findFirst({
            where: {id: Number(req.params.id)},
            include: {
                tags:true,
                likes: true,
                user: true
            }
        });

        if (!blog) {
            res.sendStatus(404);
            return;
        }

        res.json({ data: blog });
    },
];

//new blog
export const create: RequestHandler[] = [];

//edit mode?
export const update: RequestHandler[] = [];


//edit mode?
export const destroy: RequestHandler[] = [
    async (req, res) => {

    },
];