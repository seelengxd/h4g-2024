import { Router } from "express";
import { create, update } from "../controllers/registrations";

const registrationsRouter = Router({ mergeParams: true });

registrationsRouter.post("/", create);
registrationsRouter.put("/:id", update);

export default registrationsRouter;
