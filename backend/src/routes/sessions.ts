import { Router } from "express";
import { show } from "../controllers/sessions";

const sessionsRouter = Router({ mergeParams: true });

sessionsRouter.get("/:id", show);

export default sessionsRouter;
