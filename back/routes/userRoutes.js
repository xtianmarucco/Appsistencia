import express from "express";
import { getUsers } from "../controllers/userController.js";
import { getUsersWithHours } from "../controllers/userController.js";


const router = express.Router();

router.get("/", getUsers);
router.get("/hours", getUsersWithHours);

export default router; // 🔥 Exportamos correctamente
