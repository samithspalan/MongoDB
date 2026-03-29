import express from "express";
import {
  getCrew,
  getCrewById,
  createCrew,
  updateCrew,
  deleteCrew,
} from "../controllers/crewController.js";

const router = express.Router();

router.get("/", getCrew);
router.get("/:id", getCrewById);
router.post("/", createCrew);
router.put("/:id", updateCrew);
router.delete("/:id", deleteCrew);

export default router;
