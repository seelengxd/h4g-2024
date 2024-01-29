import { Router } from "express";
import authRouter from "./auth";
import organisationsRouter from "./organisations";
import activitiesRouter from "./activities";

const apiRouter = Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/organisations", organisationsRouter);
apiRouter.use("/activities", activitiesRouter);

export default apiRouter;
