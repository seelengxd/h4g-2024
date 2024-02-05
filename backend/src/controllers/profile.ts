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
    upload.none(),
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

        //console.log("this"+ req.body);

        const {
            //user fields 
            fullName = currUser.fullName,
            prefName = currUser.preferredName,
            email = currUser.email,
            
            //profile fields
            dob = profile.dob, 
            description=profile.description, 
            interests = profile.interests, 
            skills = profile.skills, 
            imageUrl = profile.imageUrl,
        } = req.body;


        //console.log("hi"+ JSON.stringify(description))

        //monday, tuesday, wednesday, thursday, friday, saturday, sunday

        const newProfile = await prisma.profile.update({
            where: { userId: Number((req.user as User).id) },
            data: {
                ...(dob? {dob} : {}),
                ...(description ? {description} : {}),
                interests: { connect: interests.map((interestId: Interest) => ({ id: interestId.id })) },
                skills: { connect: skills.map((skillId: Skill) => ({ id: skillId.id })) },
                imageUrl,
                //monday, tuesday, wednesday, thursday, friday, saturday, sunday
            }
        });

        const newUser = await prisma.user.update({
            where: {id: Number((req.user as User).id) },
            data: {
                fullName: fullName,
                preferredName: prefName,
                email: email,
            }
        })
        //console.log('db updated');

        res.json({ id: newProfile.id });
    },
];

export const destroy: RequestHandler[] = [
    async (req, res) => {

    },
];