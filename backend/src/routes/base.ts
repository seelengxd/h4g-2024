import { Router } from "express";
import authRouter from "./auth";
import organisationsRouter from "./organisations";
import activitiesRouter from "./activities";
import enrollmentFormsRouter from "./enrollmentForms";
import submissionsRouter from "./submissions";
import interestsRouter from "./interests";
import registrationsRouter from "./registrations";
import sessionsRouter from "./sessions";
import feedbackRouter from "./feedback";

const apiRouter = Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/organisations", organisationsRouter);
apiRouter.use("/activities", activitiesRouter);
apiRouter.use("/enrollment-forms", enrollmentFormsRouter);
apiRouter.use("/submissions", submissionsRouter);
apiRouter.use("/interests", interestsRouter);
apiRouter.use("/registrations", registrationsRouter);
apiRouter.use("/sessions", sessionsRouter);
apiRouter.use("/feedbacks", feedbackRouter);

export default apiRouter;
