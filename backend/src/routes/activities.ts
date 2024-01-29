import { Router } from "express";
import {
  create,
  destroy,
  index,
  show,
  update,
} from "../controllers/activities";

const activitiesRouter = Router({ mergeParams: true });

activitiesRouter.get("/", index);
activitiesRouter.get("/:id", show);
activitiesRouter.post("/", create);
activitiesRouter.put("/:id", update);
activitiesRouter.delete("/:id", destroy);

export default activitiesRouter;
