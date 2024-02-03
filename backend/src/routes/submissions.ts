import { Router } from "express";
import { create, destroy, show, update } from "../controllers/submissions";

const submissionsRouter = Router({ mergeParams: true });

submissionsRouter.get("/:id", show);
submissionsRouter.post("/", create);
submissionsRouter.put("/:id", update);
submissionsRouter.delete("/:id", destroy);

export default submissionsRouter;
