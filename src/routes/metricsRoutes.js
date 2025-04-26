import express from "express";
import {
  getDailySubmissions,
  getSubmissionsByCountry,
  getSubmissionsByDateRange,
} from "../controllers/metricsController.js";

const router = express.Router();

router.get("/daily-submissions", getDailySubmissions);
router.get("/submissions-by-country", getSubmissionsByCountry);
router.get("/submissions-by-date-range", getSubmissionsByDateRange);

export default router;
