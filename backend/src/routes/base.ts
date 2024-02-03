import { Router } from "express";
import authRouter from "./auth";
import organisationsRouter from "./organisations";
import activitiesRouter from "./activities";
import enrollmentFormsRouter from "./enrollmentForms";
import submissionsRouter from "./submissions";
import interestsRouter from "./interests";

const apiRouter = Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/organisations", organisationsRouter);
apiRouter.use("/activities", activitiesRouter);
apiRouter.use("/enrollment-forms", enrollmentFormsRouter);
apiRouter.use("/submissions", submissionsRouter);
apiRouter.use("/interests", interestsRouter);

export default apiRouter;
