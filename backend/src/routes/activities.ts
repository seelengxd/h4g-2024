import { Router } from "express";
import {
  create,
  destroy,
  index,
  show,
  update,
} from "../controllers/activities";
import { requireAdmin } from "../middleware/auth";

const activitiesRouter = Router({ mergeParams: true });

activitiesRouter.get("/", index);
activitiesRouter.get("/:id", show);

activitiesRouter.use(requireAdmin);

activitiesRouter.post("/", create);
activitiesRouter.put("/:id", update);
activitiesRouter.delete("/:id", destroy);

export default activitiesRouter;
