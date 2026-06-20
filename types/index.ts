export type PizzaCategory =
  | "veg"
  | "chicken"
  | "beef"
  | "cheese-burst"
  | "spicy"
  | "premium";

export type PizzaSize = "small" | "medium" | "large" | "xl";
export type CrustType = "classic" | "thin" | "stuffed" | "gluten-free";

export interface Pizza {
  id: string;
  name: string;
  description: string;
  ingredients: string[];
  image: string;
  price: number;
  calories: number;
  spiceLevel: 0 | 1 | 2 | 3 | 4 | 5;
  category: PizzaCategory[];
  isPremium: boolean;
  nutrition: {
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
  };
}

export interface CartItem {
  id: string;
  pizzaId: string;
  name: string;
  image: string;
  size: PizzaSize;
  crust: CrustType;
  cheeseLevel: number;
  extraToppings: string[];
  quantity: number;
  unitPrice: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  customer: CustomerInfo;
  subtotal: number;
  tax: number;
  deliveryFee: number;
  total: number;
  status: OrderStatus;
  createdAt: string;
  estimatedDelivery: string;
  paymentMethod: PaymentMethod;
  paymentStatus: "pending" | "paid" | "cod";
}

export type OrderStatus =
  | "received"
  | "cooking"
  | "packing"
  | "rider-assigned"
  | "on-the-way"
  | "delivered";

export type PaymentMethod = "cod" | "card" | "stripe";

export interface CustomerInfo {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  apartment: string;
  city: string;
}

export interface Deal {
  id: string;
  title: string;
  description: string;
  discount: string;
  code: string;
  expiresAt: string;
  image: string;
  badge: string;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  text: string;
  avatar: string;
}

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  rewardPoints: number;
  savedAddresses: string[];
  orderHistory: string[];
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface AdminOrder {
  id: string;
  customer: string;
  items: number;
  total: number;
  status: OrderStatus;
  time: string;
}

export interface AnalyticsData {
  label: string;
  value: number;
}

export const SIZE_MULTIPLIERS: Record<PizzaSize, number> = {
  small: 0.75,
  medium: 1,
  large: 1.35,
  xl: 1.65,
};

export const CRUST_PRICES: Record<CrustType, number> = {
  classic: 0,
  thin: 0,
  stuffed: 2.5,
  "gluten-free": 3,
};

export const EXTRA_TOPPING_PRICE = 1.75;
