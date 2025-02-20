import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";  
import attendanceRoutes from "./routes/attendanceRoutes.js";  

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/attendances", attendanceRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
