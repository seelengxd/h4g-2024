import { Router } from "express";
import { index, show } from "../controllers/volunteers";

const volunteersRouter = Router({ mergeParams: true });

volunteersRouter.get("/", index);
volunteersRouter.get("/:id", show);

export default volunteersRouter;
