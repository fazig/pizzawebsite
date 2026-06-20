"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Pizza,
  ShoppingBag,
  Truck,
  Users,
  Package,
  TrendingUp,
  DollarSign,
} from "lucide-react";
import { PageTransition, FadeIn } from "@/components/effects/page-transition";
import { GlassCard } from "@/components/ui/glass-card";
import { Progress } from "@/components/ui/progress";
import { PIZZAS } from "@/constants/pizzas";
import { OrderStatus } from "@/types";
import { cn } from "@/lib/utils";

const MOCK_ORDERS = [
  { id: "FZ-001", customer: "Sarah Chen", items: 2, total: 34.99, status: "cooking" as OrderStatus, time: "2 min ago" },
  { id: "FZ-002", customer: "Marcus Webb", items: 1, total: 17.99, status: "on-the-way" as OrderStatus, time: "8 min ago" },
  { id: "FZ-003", customer: "Elena Rossi", items: 3, total: 52.47, status: "received" as OrderStatus, time: "12 min ago" },
  { id: "FZ-004", customer: "James Park", items: 1, total: 21.99, status: "delivered" as OrderStatus, time: "25 min ago" },
];

const REVENUE_DATA = [
  { label: "Mon", value: 2400 },
  { label: "Tue", value: 3200 },
  { label: "Wed", value: 2800 },
  { label: "Thu", value: 4100 },
  { label: "Fri", value: 5200 },
  { label: "Sat", value: 6800 },
  { label: "Sun", value: 5900 },
];

const INVENTORY = [
  { item: "Mozzarella", stock: 85, unit: "kg" },
  { item: "Dough Balls", stock: 120, unit: "pcs" },
  { item: "Pepperoni", stock: 45, unit: "kg" },
  { item: "San Marzano", stock: 60, unit: "kg" },
  { item: "Basil", stock: 15, unit: "kg" },
];

const SIDEBAR = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: Pizza, label: "Menu" },
  { icon: ShoppingBag, label: "Orders" },
  { icon: Truck, label: "Delivery" },
  { icon: Users, label: "Customers" },
  { icon: Package, label: "Inventory" },
];

const STATUS_COLORS: Record<OrderStatus, string> = {
  received: "text-blue-400",
  cooking: "text-orange-400",
  packing: "text-yellow-400",
  "rider-assigned": "text-purple-400",
  "on-the-way": "text-cyan-400",
  delivered: "text-green-400",
};

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const maxRevenue = Math.max(...REVENUE_DATA.map((d) => d.value));

  return (
    <PageTransition>
      <div className="flex min-h-screen pt-20">
        <aside className="hidden lg:flex w-64 flex-col glass-strong border-r border-white/5 p-4 fixed left-0 top-20 bottom-0">
          <p className="text-xs font-medium text-white/30 uppercase tracking-wider px-3 mb-4">Admin Panel</p>
          {SIDEBAR.map((item) => (
            <button
              key={item.label}
              onClick={() => setActiveTab(item.label)}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all mb-1",
                activeTab === item.label
                  ? "bg-orange-500/15 text-orange-400"
                  : "text-white/50 hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </button>
          ))}
        </aside>

        <main className="flex-1 lg:ml-64 px-4 py-8 sm:px-6">
          <FadeIn>
            <h1 className="font-display text-3xl font-bold text-white">Dashboard</h1>
            <p className="text-white/50 mt-1">Welcome back, Admin</p>
          </FadeIn>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[
              { icon: DollarSign, label: "Revenue Today", value: "$5,892", change: "+12%" },
              { icon: ShoppingBag, label: "Orders", value: "147", change: "+8%" },
              { icon: Users, label: "Customers", value: "1,284", change: "+23%" },
              { icon: TrendingUp, label: "Avg Order", value: "$24.50", change: "+5%" },
            ].map((stat) => (
              <GlassCard key={stat.label} hover={false}>
                <div className="flex items-center justify-between">
                  <stat.icon className="h-5 w-5 text-orange-400" />
                  <span className="text-xs text-green-400">{stat.change}</span>
                </div>
                <p className="font-display text-2xl font-bold text-white mt-3">{stat.value}</p>
                <p className="text-xs text-white/40 mt-1">{stat.label}</p>
              </GlassCard>
            ))}
          </div>

          <div className="mt-8 grid gap-6 xl:grid-cols-3">
            <GlassCard hover={false} className="xl:col-span-2">
              <h2 className="font-display font-semibold text-white mb-6">Revenue This Week</h2>
              <div className="flex items-end gap-3 h-48">
                {REVENUE_DATA.map((d) => (
                  <div key={d.label} className="flex-1 flex flex-col items-center gap-2">
                    <motion.div
                      className="w-full rounded-t-lg bg-gradient-to-t from-[#ff6b2c] to-[#ff2d2d]/60"
                      initial={{ height: 0 }}
                      animate={{ height: `${(d.value / maxRevenue) * 100}%` }}
                      transition={{ duration: 0.8, delay: 0.1 }}
                    />
                    <span className="text-[10px] text-white/40">{d.label}</span>
                  </div>
                ))}
              </div>
            </GlassCard>

            <GlassCard hover={false}>
              <h2 className="font-display font-semibold text-white mb-4">Inventory</h2>
              <div className="space-y-4">
                {INVENTORY.map((item) => (
                  <div key={item.item}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-white/70">{item.item}</span>
                      <span className="text-white/40">{item.stock} {item.unit}</span>
                    </div>
                    <Progress value={item.stock} className="h-1.5" />
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>

          <GlassCard hover={false} className="mt-8">
            <h2 className="font-display font-semibold text-white mb-4">Recent Orders</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-white/40 border-b border-white/10">
                    <th className="text-left py-3 px-2">Order ID</th>
                    <th className="text-left py-3 px-2">Customer</th>
                    <th className="text-left py-3 px-2">Items</th>
                    <th className="text-left py-3 px-2">Total</th>
                    <th className="text-left py-3 px-2">Status</th>
                    <th className="text-left py-3 px-2">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {MOCK_ORDERS.map((order) => (
                    <tr key={order.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                      <td className="py-3 px-2 font-mono text-orange-400">{order.id}</td>
                      <td className="py-3 px-2 text-white/70">{order.customer}</td>
                      <td className="py-3 px-2 text-white/50">{order.items}</td>
                      <td className="py-3 px-2 text-white">${order.total}</td>
                      <td className={cn("py-3 px-2 capitalize", STATUS_COLORS[order.status])}>{order.status.replace("-", " ")}</td>
                      <td className="py-3 px-2 text-white/40">{order.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassCard>

          <GlassCard hover={false} className="mt-8">
            <h2 className="font-display font-semibold text-white mb-4">Menu Management</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {PIZZAS.slice(0, 6).map((pizza) => (
                <div key={pizza.id} className="flex items-center justify-between glass rounded-xl p-3">
                  <div>
                    <p className="text-sm font-medium text-white">{pizza.name}</p>
                    <p className="text-xs text-white/40">${pizza.price}</p>
                  </div>
                  <button className="text-xs text-orange-400 hover:text-orange-300">Edit</button>
                </div>
              ))}
            </div>
          </GlassCard>
        </main>
      </div>
    </PageTransition>
  );
}
