import { Router } from "express";
import { create, destroy, show, update } from "../controllers/enrollmentForms";

const enrollmentFormsRouter = Router({ mergeParams: true });

enrollmentFormsRouter.get("/:id", show);
enrollmentFormsRouter.post("/", create);
enrollmentFormsRouter.put("/:id", update);
enrollmentFormsRouter.delete("/:id", destroy);

export default enrollmentFormsRouter;
