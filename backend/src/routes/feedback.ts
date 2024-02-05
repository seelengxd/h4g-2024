import { Router } from "express";
import { create, show, update } from "../controllers/feedback";

const feedbackRouter = Router({ mergeParams: true });

feedbackRouter.get("/:id", show);
feedbackRouter.post("/", create);
feedbackRouter.put("/:id", update);

export default feedbackRouter;
