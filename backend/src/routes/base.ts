import { Router } from "express";
import authRouter from "./auth";
import organisationsRouter from "./organisations";
import activitiesRouter from "./activities";
import enrollmentFormsRouter from "./enrollmentForms";
import submissionsRouter from "./submissions";
import interestsRouter from "./interests";
import profileRouter from "./profile";
import skillsRouter from "./skills";
import registrationsRouter from "./registrations";
import sessionsRouter from "./sessions";
import feedbackRouter from "./feedback";
import blogRouter from "./blog";
import volunteersRouter from "./volunteers";
import reportsRouter from "./reports";

const apiRouter = Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/profile", profileRouter);
apiRouter.use("/organisations", organisationsRouter);
apiRouter.use("/activities", activitiesRouter);
apiRouter.use("/enrollment-forms", enrollmentFormsRouter);
apiRouter.use("/submissions", submissionsRouter);
apiRouter.use("/interests", interestsRouter);
apiRouter.use("/skills", skillsRouter);
apiRouter.use("/registrations", registrationsRouter);
apiRouter.use("/sessions", sessionsRouter);
apiRouter.use("/feedbacks", feedbackRouter);
apiRouter.use("/blogs", blogRouter);
apiRouter.use("/volunteers", volunteersRouter);
apiRouter.use("/reports", reportsRouter);


export default apiRouter;
