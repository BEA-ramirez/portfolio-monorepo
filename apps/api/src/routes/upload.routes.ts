import { Router } from "express";
import { createRouteHandler } from "uploadthing/express";
import { uploadRouter } from "../controller/uploadthing/core";

const router = Router();

router.use("/", createRouteHandler({ router: uploadRouter }));

export default router;
