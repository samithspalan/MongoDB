import express from "express";
import { processNaturalLanguageQuery } from "../controllers/aiController.js";

const router = express.Router();

router.post("/query", processNaturalLanguageQuery);

export default router;
