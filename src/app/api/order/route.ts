import { NextResponse } from "next/server";
import { appendOrderToSheet } from "@/lib/google-sheets";
import { sendOrderEmails, verifyEmailConnection } from "@/lib/mailer";
import { orderInputSchema } from "@/lib/order-schema";
import { createOrderRecord } from "@/lib/order-utils";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const origin = request.headers.get("origin");
    const allowedOrigin = process.env.FRONTEND_URL || process.env.NEXT_PUBLIC_SITE_URL;

    if (allowedOrigin && origin && origin !== allowedOrigin) {
      return NextResponse.json(
        { success: false, message: "This order request is not allowed." },
        { status: 403 },
      );
    }

    const body = await request.json();
    const parsed = orderInputSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Please check the form and try again.",
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const expectedTotal = parsed.data.quantity * parsed.data.pricePerPiece;
    if (parsed.data.totalPrice !== expectedTotal) {
      return NextResponse.json(
        { success: false, message: "Total price does not match the selected quantity." },
        { status: 400 },
      );
    }

    const order = createOrderRecord(parsed.data);

    await verifyEmailConnection();
    await appendOrderToSheet(order);
    await sendOrderEmails(order);

    return NextResponse.json({
      success: true,
      message: "Order submitted successfully.",
      order,
    });
  } catch (error) {
    console.error("Order submission failed:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Order submission failed. Please try again.",
      },
      { status: 500 },
    );
  }
}
