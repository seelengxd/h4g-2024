import { Router } from "express";
import { create, index, markAbsent, markAttended, unmark, update } from "../controllers/registrations";

const registrationsRouter = Router({ mergeParams: true });

registrationsRouter.get("/", index);
registrationsRouter.post("/", create);
registrationsRouter.put("/:id/markAttended", markAttended);
registrationsRouter.put("/:id/markAbsent", markAbsent);
registrationsRouter.put("/:id/unmark", unmark);
registrationsRouter.put("/:id", update);

export default registrationsRouter;