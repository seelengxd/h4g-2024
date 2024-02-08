import { Router } from "express";
import {
  create,
  destroy,
  index,
  show,
  update,
} from "../controllers/organisations";
import { requireAdmin } from "../middleware/auth";

const organisationsRouter = Router();

organisationsRouter.get("/", index);
organisationsRouter.get("/:id", show);

organisationsRouter.use(requireAdmin);

organisationsRouter.post("/", create);
organisationsRouter.put("/:id", update);
organisationsRouter.delete("/:id", destroy);

export default organisationsRouter;
