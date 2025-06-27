import express from 'express';
import { getAttendances, checkInOut, getCheckInStatus } from '../controllers/attendanceController.js';

const router = express.Router();

router.get("/:userId", getAttendances); // 📌 Ruta para obtener las asistencias de un usuario
// 📌 Ruta para registrar una asistencia
// router.get("/worked-hours/:userId", getWorkedHours); // 🔥 Obtener horas trabajadas por usuario
router.post("/check-in-out", checkInOut); // 📌 Ruta para hacer check-in o check-out
router.get("/check-in-status/:user_id", getCheckInStatus);

export default router;