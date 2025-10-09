import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  secure: process.env.MAIL_SECURE === "true",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

export async function sendEmail({ kimga, mavzu, matn }) {
  await transporter.sendMail({
    from: process.env.MAIL_FROM,
    to: kimga,
    subject: mavzu,
    text: matn,
  });
}
