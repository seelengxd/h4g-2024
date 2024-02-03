import { Router } from "express";
import { index } from "../controllers/interests";

const interestsRouter = Router({ mergeParams: true });

interestsRouter.get("/", index);

export default interestsRouter;
