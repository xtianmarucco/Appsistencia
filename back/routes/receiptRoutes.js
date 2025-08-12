import express from "express";
import { createReceipt } from "../controllers/receiptController.js";

const router = express.Router();

router.post("/receipts", createReceipt);

export default router;