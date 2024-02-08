import { Router } from "express";
import {
  getVolunteerActivityReport,
  getVolunteerDemographicReport,
} from "../controllers/reports";

const reportsRouter = Router({ mergeParams: true });

reportsRouter.get("/volunteer-activity-report", getVolunteerActivityReport);
reportsRouter.get(
  "/volunteer-demographic-report",
  getVolunteerDemographicReport
);

export default reportsRouter;
