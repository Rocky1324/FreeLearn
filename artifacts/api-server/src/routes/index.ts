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

// Proxy pour permettre le cache offline des PDF externes
router.get("/proxy-pdf", async (req, res) => {
  const targetUrl = req.query.url as string;
  if (!targetUrl) {
    return res.status(400).json({ error: "URL manquante" });
  }

  try {
    const response = await fetch(targetUrl);
    if (!response.ok) throw new Error("Erreur de récupération");

    const contentType = response.headers.get("content-type");
    if (contentType) res.setHeader("Content-Type", contentType);
    
    // On force le cache navigateur pour aider le Service Worker
    res.setHeader("Cache-Control", "public, max-age=31536000");

    const arrayBuffer = await response.arrayBuffer();
    res.send(Buffer.from(arrayBuffer));
  } catch (error) {
    console.error("Proxy error:", error);
    res.status(500).json({ error: "Impossible de récupérer le fichier" });
  }
});

export default router;
