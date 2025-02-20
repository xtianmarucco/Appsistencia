import express from 'express';
import { getAttendances, registerAttendance } from '../controllers/attendanceController.js';

const router = express.Router();

router.get("/:userId", getAttendances); // 📌 Ruta para obtener las asistencias de un usuario
router.post("/", registerAttendance); // 📌 Ruta para registrar una asistencia


export default router;