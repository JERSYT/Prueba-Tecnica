import express from "express";
import { handleContactSubmission } from "../controllers/contactController.js";

const router = express.Router();

router.post("/contact-submissions", handleContactSubmission);

export default router;
