import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

async function sendUserConfirmation(to, fullName) {
  await transporter.sendMail({
    from: '"Consultores Estratégicos" <no-reply@example.com>',
    to,
    subject: "Confirmación de contacto",
    text: `Hola ${fullName}, hemos recibido tu mensaje. ¡Gracias por contactarnos!`,
  });
}

async function sendAdminNotification(data) {
  await transporter.sendMail({
    from: '"Consultores Estratégicos" <no-reply@example.com>',
    to: process.env.ADMIN_EMAIL,
    subject: "Nuevo formulario de contacto",
    text: `Se ha recibido un nuevo contacto:\n\n${JSON.stringify(
      data,
      null,
      2
    )}`,
  });
}

export { sendUserConfirmation, sendAdminNotification };
