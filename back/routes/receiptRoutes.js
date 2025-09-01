import express from "express";
import { createReceipt, getReceiptsByUser } from "../controllers/receiptController.js";

const router = express.Router();

router.post("/", createReceipt); // ✔️ Ruta correcta
router.get("/user/:user_id", getReceiptsByUser);

export default router;