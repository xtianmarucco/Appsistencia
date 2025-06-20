import express from "express";
import { getUserShifts } from "../controllers/userShiftsController.js";

const router = express.Router();

router.get("/:id/shifts", getUserShifts);

export default router;