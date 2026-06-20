import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export function generateOrderId(): string {
  return `FZ-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
}

export function calculateDeliveryTime(minutes: number): string {
  const now = new Date();
  now.setMinutes(now.getMinutes() + minutes);
  return now.toISOString();
}

export function getEstimatedMinutes(itemCount: number): number {
  return 25 + itemCount * 3;
}
