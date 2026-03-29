import express from "express";
import {
  getShips,
  getShip,
  createShip,
  updateShip,
  deleteShip
} from "../controllers/shipController.js";

const router = express.Router();

router.get("/", getShips);
router.get("/:id", getShip);
router.post("/", createShip);
router.put("/:id", updateShip);
router.delete("/:id", deleteShip);

export default router;
