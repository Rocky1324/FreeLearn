import { Router, type IRouter } from "express";
import cookieParser from "cookie-parser";
import healthRouter from "./health.js";
import authRouter from "./auth.js";
import progressRouter from "./progress.js";
import calendarRouter from "./calendar.js";
import downloadsRouter from "./downloads.js";
import videosRouter from "./videos.js";

const router: IRouter = Router();

router.use(cookieParser());
router.use(healthRouter);
router.use(authRouter);
router.use("/progress", progressRouter);
router.use("/calendar", calendarRouter);
router.use("/downloads", downloadsRouter);
router.use("/videos", videosRouter);

export default router;
