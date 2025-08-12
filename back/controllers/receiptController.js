// controllers/receiptController.js
import pool from "../database.js";

export const createReceipt = async (req, res) => {
  const {
    user_id,
    start_date,
    end_date,
    total_hours,
    total_shifts,
    hourly_wage,
    total_amount,
  } = req.body;

  try {
    // Valida datos mínimos
    if (!user_id || !start_date || !end_date) {
      return res.status(400).json({ error: "Faltan datos requeridos" });
    }

    // Inserta recibo
    const result = await pool.query(
      `INSERT INTO receipts
      (user_id, start_date, end_date, total_hours, total_shifts, hourly_wage, total_amount, created_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())
      RETURNING *`,
      [user_id, start_date, end_date, total_hours, total_shifts, hourly_wage, total_amount]
    );

    res.status(201).json({ receipt: result.rows[0] });
  } catch (error) {
    console.error("❌ Error al guardar recibo:", error);
    res.status(500).json({ error: "Error al guardar recibo" });
  }
};