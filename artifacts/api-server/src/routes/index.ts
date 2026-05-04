import { Router, type IRouter } from "express";
import healthRouter from "./health.js";
import authRouter from "./auth.js";
import progressRouter from "./progress.js";
import calendarRouter from "./calendar.js";
import downloadsRouter from "./downloads.js";

const router: IRouter = Router();

router.use(healthRouter);
router.use("/auth", authRouter);
router.use("/progress", progressRouter);
router.use("/calendar", calendarRouter);
router.use("/downloads", downloadsRouter);

export default router;
