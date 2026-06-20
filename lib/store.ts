"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  CartItem,
  CustomerInfo,
  Order,
  OrderStatus,
  PaymentMethod,
  PizzaSize,
  CrustType,
} from "@/types";
import {
  SIZE_MULTIPLIERS,
  CRUST_PRICES,
  EXTRA_TOPPING_PRICE,
} from "@/types";
import { generateOrderId, calculateDeliveryTime, getEstimatedMinutes } from "@/lib/utils";
import { TAX_RATE, DELIVERY_FEE, FREE_DELIVERY_THRESHOLD } from "@/constants/navigation";
import { PROMO_CODES } from "@/constants/pizzas";

interface CartStore {
  items: CartItem[];
  promoCode: string;
  promoDiscount: number;
  addItem: (item: Omit<CartItem, "id">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  applyPromo: (code: string) => boolean;
  getSubtotal: () => number;
  getTax: () => number;
  getDeliveryFee: () => number;
  getTotal: () => number;
  getItemCount: () => number;
}

interface OrderStore {
  currentOrder: Order | null;
  orderHistory: Order[];
  trackingStatus: OrderStatus;
  placeOrder: (
    items: CartItem[],
    customer: CustomerInfo,
    paymentMethod: PaymentMethod
  ) => Order;
  updateTrackingStatus: (status: OrderStatus) => void;
  setCurrentOrder: (order: Order | null) => void;
}

interface AuthStore {
  isLoggedIn: boolean;
  userName: string;
  userEmail: string;
  rewardPoints: number;
  login: (email: string, password: string) => boolean;
  signup: (name: string, email: string, password: string) => boolean;
  logout: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      promoCode: "",
      promoDiscount: 0,
      addItem: (item) => {
        const id = `${item.pizzaId}-${item.size}-${item.crust}-${Date.now()}`;
        set((state) => ({
          items: [...state.items, { ...item, id }],
        }));
      },
      removeItem: (id) =>
        set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
      updateQuantity: (id, quantity) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id ? { ...i, quantity: Math.max(1, quantity) } : i
          ),
        })),
      clearCart: () => set({ items: [], promoCode: "", promoDiscount: 0 }),
      applyPromo: (code) => {
        const upper = code.toUpperCase();
        const discount = PROMO_CODES[upper];
        if (discount !== undefined) {
          set({ promoCode: upper, promoDiscount: discount });
          return true;
        }
        return false;
      },
      getSubtotal: () =>
        get().items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0),
      getTax: () => get().getSubtotal() * TAX_RATE,
      getDeliveryFee: () =>
        get().getSubtotal() >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE,
      getTotal: () => {
        const subtotal = get().getSubtotal();
        const discount = get().promoDiscount;
        let discounted = subtotal;
        if (discount > 0 && discount < 1) {
          discounted = subtotal * (1 - discount);
        } else if (discount >= 1) {
          discounted = Math.max(0, subtotal - discount);
        }
        return discounted + get().getTax() + get().getDeliveryFee();
      },
      getItemCount: () =>
        get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    { name: "fazig-cart" }
  )
);

export const useOrderStore = create<OrderStore>()(
  persist(
    (set) => ({
      currentOrder: null,
      orderHistory: [],
      trackingStatus: "received",
      placeOrder: (items, customer, paymentMethod) => {
        const subtotal = items.reduce(
          (sum, i) => sum + i.unitPrice * i.quantity,
          0
        );
        const tax = subtotal * TAX_RATE;
        const deliveryFee =
          subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
        const order: Order = {
          id: generateOrderId(),
          items,
          customer,
          subtotal,
          tax,
          deliveryFee,
          total: subtotal + tax + deliveryFee,
          status: "received",
          createdAt: new Date().toISOString(),
          estimatedDelivery: calculateDeliveryTime(
            getEstimatedMinutes(items.length)
          ),
          paymentMethod,
          paymentStatus: paymentMethod === "cod" ? "cod" : "paid",
        };
        set((state) => ({
          currentOrder: order,
          orderHistory: [order, ...state.orderHistory],
          trackingStatus: "received",
        }));
        return order;
      },
      updateTrackingStatus: (status) => set({ trackingStatus: status }),
      setCurrentOrder: (order) => set({ currentOrder: order }),
    }),
    { name: "fazig-orders" }
  )
);

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      userName: "",
      userEmail: "",
      rewardPoints: 250,
      login: (email, password) => {
        void password;
        set({
          isLoggedIn: true,
          userEmail: email,
          userName: email.split("@")[0],
        });
        return true;
      },
      signup: (name, email, password) => {
        void password;
        set({
          isLoggedIn: true,
          userName: name,
          userEmail: email,
          rewardPoints: 500,
        });
        return true;
      },
      logout: () =>
        set({
          isLoggedIn: false,
          userName: "",
          userEmail: "",
        }),
    }),
    { name: "fazig-auth" }
  )
);

export function calculateUnitPrice(
  basePrice: number,
  size: PizzaSize,
  crust: CrustType,
  cheeseLevel: number,
  extraToppings: string[]
): number {
  const sizePrice = basePrice * SIZE_MULTIPLIERS[size];
  const crustPrice = CRUST_PRICES[crust];
  const cheesePrice = cheeseLevel > 50 ? (cheeseLevel - 50) * 0.05 : 0;
  const toppingsPrice = extraToppings.length * EXTRA_TOPPING_PRICE;
  return sizePrice + crustPrice + cheesePrice + toppingsPrice;
}
