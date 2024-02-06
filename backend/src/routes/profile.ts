import { Router } from "express";
import {
  destroy,
  show,
  update,
} from "../controllers/profile";

const profileRouter = Router();

profileRouter.get("/", show);
profileRouter.put("/", update);
profileRouter.delete("/", destroy);

export default profileRouter;