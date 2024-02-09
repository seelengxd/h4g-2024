import { Router } from "express";
import {
  create,
  index,
  markAbsent,
  markAttended,
  unmark,
  show,
  getCertificate,
} from "../controllers/registrations";
import { requireAdmin } from "../middleware/auth";

const registrationsRouter = Router({ mergeParams: true });

registrationsRouter.get("/", index);
registrationsRouter.post("/", create);
registrationsRouter.get("/:id", show);
registrationsRouter.get("/:id/certificate", getCertificate);

registrationsRouter.use(requireAdmin);

registrationsRouter.put("/:id/markAttended", markAttended);
registrationsRouter.put("/:id/markAbsent", markAbsent);
registrationsRouter.put("/:id/unmark", unmark);

export default registrationsRouter;
