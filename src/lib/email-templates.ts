import type { OrderRecord } from "@/lib/order-schema";
import { formatPrice } from "@/lib/product";

const brand = () => process.env.BRAND_NAME || "Comfort Summer";
const replyEmail = () => process.env.EMAIL_FROM || process.env.BUSINESS_EMAIL || "";

const shell = (content: string) => `
  <div style="margin:0;padding:0;background:#f5efe2;font-family:Arial,Helvetica,sans-serif;color:#0c1831;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f5efe2;padding:24px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;background:#ffffff;border-radius:18px;overflow:hidden;border:1px solid #eadcc5;">
            ${content}
          </table>
        </td>
      </tr>
    </table>
  </div>
`;

const header = `
  <tr>
    <td style="background:#0c1831;padding:28px 30px;color:#ffffff;">
      <div style="font-size:14px;letter-spacing:2px;text-transform:uppercase;color:#e6d5bc;">${brand()}</div>
      <div style="font-size:26px;line-height:1.25;font-weight:700;margin-top:8px;">Cash On Delivery Order</div>
    </td>
  </tr>
`;

const row = (label: string, value: string | number) => `
  <tr>
    <td style="padding:11px 0;color:#566070;font-size:14px;border-bottom:1px solid #f0e8da;">${label}</td>
    <td align="right" style="padding:11px 0;color:#0c1831;font-size:14px;font-weight:700;border-bottom:1px solid #f0e8da;">${value}</td>
  </tr>
`;

export function businessOrderEmail(order: OrderRecord) {
  return shell(`
    ${header}
    <tr>
      <td style="padding:30px;">
        <div style="display:inline-block;background:#d73032;color:#ffffff;border-radius:999px;padding:8px 13px;font-size:12px;font-weight:700;text-transform:uppercase;">New Order</div>
        <h1 style="margin:18px 0 8px;font-size:24px;line-height:1.25;color:#0c1831;">New product order received</h1>
        <p style="margin:0 0 22px;color:#566070;font-size:15px;line-height:1.6;">Please call the customer soon to confirm this order.</p>

        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom:22px;">
          ${row("Order ID", order.orderId)}
          ${row("Date & Time", order.dateTime)}
          ${row("Customer Name", order.fullName)}
          ${row("Phone Number", order.phone)}
          ${row("Email Address", order.email)}
          ${row("Exact Location", order.location)}
        </table>

        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom:22px;">
          ${row("Product Name", order.productName)}
          ${row("Quantity", order.quantity)}
          ${row("Price Per Piece", formatPrice(order.pricePerPiece))}
          ${row("Total Price", formatPrice(order.totalPrice))}
          ${row("Payment Method", order.paymentMethod)}
          ${row("Order Status", order.orderStatus)}
        </table>

        <div style="background:#f5efe2;border-left:5px solid #d73032;border-radius:12px;padding:16px;color:#0c1831;font-weight:700;">
          Please call the customer soon to confirm this order.
        </div>
      </td>
    </tr>
  `);
}

export function customerOrderEmail(order: OrderRecord) {
  return shell(`
    ${header}
    <tr>
      <td style="padding:30px;">
        <h1 style="margin:0 0 10px;font-size:25px;line-height:1.25;color:#0c1831;">Thank you for your order, ${order.fullName}.</h1>
        <p style="margin:0 0 22px;color:#566070;font-size:15px;line-height:1.7;">We have received your order successfully. Our sales representative will call you soon to confirm your order.</p>

        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#fbf8f1;border:1px solid #eadcc5;border-radius:14px;padding:12px;margin-bottom:22px;">
          ${row("Order ID", order.orderId)}
          ${row("Product", order.productName)}
          ${row("Quantity", order.quantity)}
          ${row("Total Price", formatPrice(order.totalPrice))}
          ${row("Payment Method", order.paymentMethod)}
        </table>

        <p style="margin:0;color:#566070;font-size:15px;line-height:1.7;">For support, reply to this email or contact us at <strong>${replyEmail()}</strong>.</p>
        <p style="margin:20px 0 0;color:#0c1831;font-size:15px;line-height:1.7;">Thank you,<br><strong>${brand()}</strong></p>
      </td>
    </tr>
  `);
}
