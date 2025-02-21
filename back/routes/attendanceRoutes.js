import express from 'express';
import { getAttendances, registerAttendance } from '../controllers/attendanceController.js';

const router = express.Router();

router.get("/:userId", getAttendances); // 📌 Ruta para obtener las asistencias de un usuario
router.post("/", registerAttendance); // 📌 Ruta para registrar una asistencia
// router.get("/worked-hours/:userId", getWorkedHours); // 🔥 Obtener horas trabajadas por usuario


export default router;