import { Router, type IRouter } from "express";
import healthRouter from "./health";
import authRouter from "./auth";
import progressRouter from "./progress";
import teacherRouter from "./teacher";
import dashboardRouter from "./dashboard";
import forumRouter from "./forum";

const router: IRouter = Router();

router.use(healthRouter);
router.use("/auth", authRouter);
router.use("/progress", progressRouter);
router.use("/teacher/videos", teacherRouter);
router.use("/dashboard", dashboardRouter);
router.use("/forum", forumRouter);

export default router;
