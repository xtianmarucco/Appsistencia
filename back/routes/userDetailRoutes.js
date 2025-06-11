import express from "express";
import { getUserStats } from "../controllers/userDetailController.js";

const router = express.Router();

// Esta ruta será: /api/users/:id/stats
router.get("/:id/stats", getUserStats);

export default router;
