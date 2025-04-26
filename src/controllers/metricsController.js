import { pool } from "../models/db.js";

// Submissions de hoy
export async function getDailySubmissions(req, res) {
  try {
    const [rows] = await pool.execute(
      `SELECT COUNT(*) AS count 
       FROM contact_submissions 
       WHERE DATE(created_at) = CURDATE()`
    );
    res.status(200).json({ conteo: rows[0].count });
  } catch (error) {
    console.error("Error al obtener métricas:", error);
    res.status(500).json({ mensaje: "Error al obtener las métricas diarias." });
  }
}

// Submissions por país
export async function getSubmissionsByCountry(req, res) {
  try {
    const [rows] = await pool.execute(
      `SELECT country, COUNT(*) AS count 
       FROM contact_submissions 
       GROUP BY country`
    );
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error al obtener métricas por país:", error);
    res
      .status(500)
      .json({ mensaje: "Error al obtener las métricas por país." });
  }
}

// Submissions por rango de fechas
export async function getSubmissionsByDateRange(req, res) {
  const { start, end } = req.query;

  if (!start || !end) {
    return res
      .status(400)
      .json({ mensaje: "Debe proporcionar 'start' y 'end' en la query" });
  }

  try {
    const [rows] = await pool.execute(
      `SELECT DATE(created_at) AS date, COUNT(*) AS count 
       FROM contact_submissions 
       WHERE DATE(created_at) BETWEEN ? AND ?
       GROUP BY DATE(created_at)
       ORDER BY DATE(created_at)`,
      [start, end]
    );
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error al obtener métricas por rango:", error);
    res
      .status(500)
      .json({ mensaje: "Error al obtener métricas por rango de fechas." });
  }
}
