import { RequestHandler } from "express";
import prisma from "../lib/prisma";
import { body, param, validationResult } from "express-validator";
import { Interest, Skill, User } from "@prisma/client";
import multer from "multer";


export const show: RequestHandler[] = [

    async (req, res) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            res.status(400).send({ errors: result.array() });
            return;
        }

        const profile = await prisma.profile.findFirst({
            where: { id: Number((req.user as User).id) },
            include: {
                interests: true,
                skills: true,
                user: true,
            }
        });
        if (!profile) {
            res.sendStatus(404);
            return;
        }

        res.json({ data: profile });
    },
];

const upload = multer({ dest: "./uploads/" });

export const update: RequestHandler[] = [
    upload.single("image"),
    async (req, res) => {

        const result = validationResult(req);
        if (!result.isEmpty()) {
            res.status(400).send({ errors: result.array() });
            return;
        }

        const currUser = req.user as User;

        const profile = await prisma.profile.findFirst({
            where: { userId: Number(currUser.id) },
            include: {
                interests: true,
                skills: true,
                user: true,
            }
        });
        if (!profile) {
            res.sendStatus(404);
            return;
        }

        const {
            //user fields 
            fullName = currUser.fullName,
            preferredName = currUser.preferredName,
            email = currUser.email,
            
            //profile fields
            dob = profile.dob, 
            description=profile.description, 
            interests = profile.interests.map((interest: Interest) => interest.id), 
            skills = profile.skills.map((skill: Skill) => skill.id), 
        } = req.body;

        //monday, tuesday, wednesday, thursday, friday, saturday, sunday

        const newProfile = await prisma.profile.update({
            where: { userId: Number((req.user as User).id) },
            data: {
                ...(dob? {dob} : {}),
                ...(description ? {description} : {}),
                interests: { set: [], connect: interests.map((interestId: string) => ({ id: Number(interestId)})) },
                skills: { set: [], connect: skills.map((skillId: string) => ({ id: Number(skillId) })) },
                imageUrl: req.file?.path,
                //monday, tuesday, wednesday, thursday, friday, saturday, sunday
            },
            include: {
                skills: true,
                interests: true }
        });


        const newUser = await prisma.user.update({
            where: {id: Number((req.user as User).id) },
            data: {
                fullName: fullName,
                preferredName: preferredName,
                email: email,
            }
        })

        res.json({ id: newProfile.id });
    },
];

export const destroy: RequestHandler[] = [
    async (req, res) => {

    },
];