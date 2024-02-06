import { Router } from "express";
import {
    create,
    destroy,
    index,
    show,
    update,
} from "../controllers/blogs";

const blogRouter = Router();

blogRouter.get("/", index);
blogRouter.get("/", create);
blogRouter.get("/:id", show);
blogRouter.put("/:id", update);
blogRouter.delete("/:id", destroy);

export default blogRouter;