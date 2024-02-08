import { Router } from "express";
import { create, destroy, show, update } from "../controllers/enrollmentForms";
import { requireAdmin } from "../middleware/auth";

const enrollmentFormsRouter = Router({ mergeParams: true });

enrollmentFormsRouter.get("/:id", show);

enrollmentFormsRouter.use(requireAdmin);

enrollmentFormsRouter.post("/", create);
enrollmentFormsRouter.put("/:id", update);
enrollmentFormsRouter.delete("/:id", destroy);

export default enrollmentFormsRouter;
