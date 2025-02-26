import express from "express";
import {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
  } from "../controllers/userController.js";import { getUsersWithHours } from "../controllers/userController.js";


const router = express.Router();

router.get("/", getUsers);
router.get("/hours", getUsersWithHours);
router.get("/:id", getUserById); // Obtener un usuario por ID
router.post("/", createUser); // Crear un usuario
router.put("/:id", updateUser); // Editar un usuario
router.delete("/:id", deleteUser); // Eliminar un usuario


export default router; // 🔥 Exportamos correctamente
