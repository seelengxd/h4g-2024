import { Router } from "express";
import { index } from "../controllers/skills";

const skillsRouter = Router({ mergeParams: true });

skillsRouter.get("/", index);

export default skillsRouter;