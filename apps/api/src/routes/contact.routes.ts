import { Router } from "express";
import { sendContactEmail } from "../controller/contact.controller.js";

const router = Router();

router.post("/", sendContactEmail);

export default router;
