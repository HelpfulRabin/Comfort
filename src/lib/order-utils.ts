import type { OrderInput, OrderRecord } from "@/lib/order-schema";

export function createOrderRecord(input: OrderInput): OrderRecord {
  return {
    ...input,
    orderId: `CS-${Date.now()}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`,
    dateTime: new Intl.DateTimeFormat("en-NP", {
      dateStyle: "medium",
      timeStyle: "medium",
      timeZone: "Asia/Kathmandu",
    }).format(new Date()),
    paymentMethod: "Cash On Delivery",
    orderStatus: "New Order",
    notes: "",
  };
}
