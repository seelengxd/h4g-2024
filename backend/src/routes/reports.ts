import { Router } from "express";
import { getVolunteerActivityReport } from "../controllers/reports";

const reportsRouter = Router({ mergeParams: true });

reportsRouter.get("/volunteer-activity-report", getVolunteerActivityReport);

export default reportsRouter;
