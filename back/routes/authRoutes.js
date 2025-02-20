import express from 'express';
import { validateOtp, setupOtp } from "../controllers/authController.js";

const router = express.Router();


router.post('/validate-otp', validateOtp); // 📌 Ruta para validar el OTP ingresado por el usuario
router.post('/setup-otp', setupOtp); // 📌 Ruta para configurar el OTP en el usuari

export default router;