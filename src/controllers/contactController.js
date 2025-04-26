import { pool } from "../models/db.js";
import contactSchema from "../validations/contactValidation.js";
import {
  sendUserConfirmation,
  sendAdminNotification,
} from "../services/emailService.js";

async function handleContactSubmission(req, res) {
  try {
    const { error, value } = contactSchema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json({ mensaje: "Datos inválidos: " + error.details[0].message });
    }

    const { fullName, email, country, phone, message } = value;

    const [result] = await pool.execute(
      `INSERT INTO contact_submissions (full_name, email, country, phone, message) VALUES (?, ?, ?, ?, ?)`,
      [fullName, email, country || null, phone || null, message]
    );

    // Enviar correos
    await sendUserConfirmation(email, fullName);
    await sendAdminNotification(value);

    res.status(201).json({ mensaje: "Formulario recibido correctamente." });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ mensaje: "Ocurrió un error al procesar el formulario." });
  }
}

export { handleContactSubmission };
