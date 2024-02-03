import { Router } from "express";
import authRouter from "./auth";
import organisationsRouter from "./organisations";
import activitiesRouter from "./activities";
import enrollmentFormsRouter from "./enrollmentForms";

const apiRouter = Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/organisations", organisationsRouter);
apiRouter.use("/activities", activitiesRouter);
apiRouter.use("/enrollment-forms", enrollmentFormsRouter);
export default apiRouter;
