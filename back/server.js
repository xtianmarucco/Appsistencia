import "dotenv/config";
import express from "express";
import cors from "cors";
import loginRoutes from "./routes/loginRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import attendanceRoutes from "./routes/attendanceRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import userDetailRoutes from './routes/userDetailRoutes.js';
import userShiftsRoute from './routes/userShiftsRoute.js';
import receiptRoutes from './routes/receiptRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/users", userDetailRoutes);
app.use("/api/login", loginRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/attendances", attendanceRoutes);
app.use("/api/users", userRoutes);
app.use("/api/login", loginRoutes);
app.use('/api/users', userShiftsRoute);
app.use('/api/receipts', receiptRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
