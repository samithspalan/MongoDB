import express from "express";
import {
  getCargo,
  getCargoById,
  createCargo,
  updateCargo,
  deleteCargo,
} from "../controllers/cargoController.js";

const router = express.Router();

router.get("/", getCargo);
router.get("/:id", getCargoById);
router.post("/", createCargo);
router.put("/:id", updateCargo);
router.delete("/:id", deleteCargo);

export default router;
