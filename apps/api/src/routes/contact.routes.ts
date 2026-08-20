import { Router } from "express";
import { sendContactEmail } from "../controller/contact.controller";

const router = Router();

router.post("/", sendContactEmail);

export default router;
