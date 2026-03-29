import express from "express";
import {
  getPorts,
  getPort,
  createPort,
  updatePort,
  deletePort
} from "../controllers/portController.js";

const router = express.Router();

router.get("/", getPorts);
router.get("/:id", getPort);
router.post("/", createPort);
router.put("/:id", updatePort);
router.delete("/:id", deletePort);

export default router;
