import { Router } from "express";
import authRouter from "./auth";
import organisationsRouter from "./organisations";

const apiRouter = Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/organisations", organisationsRouter);

export default apiRouter;
