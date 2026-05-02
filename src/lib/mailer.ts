import nodemailer from "nodemailer";
import type { OrderRecord } from "@/lib/order-schema";
import { businessOrderEmail, customerOrderEmail } from "@/lib/email-templates";

function requiredEnv(name: string) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function getTransporter() {
  const port = Number(process.env.SMTP_PORT || 465);

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port,
    secure: port === 465,
    auth: {
      user: requiredEnv("SMTP_USER"),
      pass: requiredEnv("SMTP_PASS"),
    },
  });
}

export async function verifyEmailConnection() {
  await getTransporter().verify();
}

export async function sendOrderEmails(order: OrderRecord) {
  const transporter = getTransporter();
  const from = process.env.EMAIL_FROM || process.env.SMTP_USER;
  const businessEmail = requiredEnv("BUSINESS_EMAIL");
  const brandName = process.env.BRAND_NAME || "Comfort Summer";

  await transporter.sendMail({
    from,
    to: businessEmail,
    replyTo: order.email,
    subject: `New Product Order Received - ${order.orderId}`,
    html: businessOrderEmail(order),
  });

  await transporter.sendMail({
    from,
    to: order.email,
    replyTo: from,
    subject: `Your Order Has Been Received - ${brandName}`,
    html: customerOrderEmail(order),
  });
}
