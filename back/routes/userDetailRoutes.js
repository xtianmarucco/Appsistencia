import express from "express";
import { getUserStats } from "../controllers/userDetailController.js";
import { getUserAttendances } from "../controllers/userDetailController.js";


const router = express.Router();

// Esta ruta será: /api/users/:id/stats
router.get("/:id/stats", getUserStats);
router.get("/:id/attendances", getUserAttendances);



export default router;
