import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

const TEMPORARY_TOKEN_SECRET = process.env.TEMPORARY_TOKEN_SECRET as string;

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  secure: false,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD,
  },
});

export function generateTemporaryToken(email: string): string {
  return jwt.sign({ email }, TEMPORARY_TOKEN_SECRET, { expiresIn: "30m" });
}

export function verifyTemporaryToken(token: string): { email: string } | null {
  try {
    const decoded = jwt.verify(token, TEMPORARY_TOKEN_SECRET) as {
      email: string;
    };
    return decoded;
  } catch (error) {
    return null;
  }
}

export default transporter;
