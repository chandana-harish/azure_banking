import { clsx } from "clsx";
import crypto from "crypto";

export function cn(...inputs: Array<string | false | null | undefined>) {
  return clsx(inputs);
}

export function formatCurrency(
  value: number | string | { toString(): string },
  currency = "USD"
) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency
  }).format(Number(value));
}

export function formatDateTime(date: Date | string) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(new Date(date));
}

export function sha256(input: Buffer | string) {
  return crypto.createHash("sha256").update(input).digest("hex");
}

export function buildRequestId() {
  return crypto.randomUUID();
}

export function buildReference(prefix: string) {
  const stamp = Date.now().toString().slice(-8);
  const random = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `${prefix}-${stamp}-${random}`;
}
