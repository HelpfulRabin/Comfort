import { google } from "googleapis";
import type { OrderRecord } from "@/lib/order-schema";

function requiredEnv(name: string) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function getPrivateKey() {
  return requiredEnv("GOOGLE_PRIVATE_KEY").replace(/\\n/g, "\n");
}

function getSheetsClient() {
  const auth = new google.auth.JWT({
    email: requiredEnv("GOOGLE_SERVICE_ACCOUNT_EMAIL"),
    key: getPrivateKey(),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  return google.sheets({ version: "v4", auth });
}

function sheetRange(tabName: string) {
  const escapedTabName = tabName.replace(/'/g, "''");
  return `'${escapedTabName}'!A:M`;
}

export async function appendOrderToSheet(order: OrderRecord) {
  const sheets = getSheetsClient();
  const spreadsheetId = requiredEnv("GOOGLE_SHEET_ID");
  const tabName = process.env.GOOGLE_SHEET_TAB_NAME || "Tshirt Order";

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: sheetRange(tabName),
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: {
      values: [
        [
          order.orderId,
          order.dateTime,
          order.fullName,
          order.phone,
          order.email,
          order.location,
          order.productName,
          order.quantity,
          order.pricePerPiece,
          order.totalPrice,
          order.paymentMethod,
          order.orderStatus,
          order.notes,
        ],
      ],
    },
  });
}
