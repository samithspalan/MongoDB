import express from "express";
import {
  getVoyages,
  getVoyage,
  createVoyage,
  updateVoyage,
  deleteVoyage,
} from "../controllers/voyageController.js";

const router = express.Router();

router.get("/", getVoyages);
router.get("/:id", getVoyage);
router.post("/", createVoyage);
router.put("/:id", updateVoyage);
router.delete("/:id", deleteVoyage);

export default router;
