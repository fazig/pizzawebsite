"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Mail, Lock, Gift, MapPin, CreditCard, History, LogOut } from "lucide-react";
import { PageTransition, FadeIn } from "@/components/effects/page-transition";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuthStore, useOrderStore } from "@/lib/store";
import { useToast } from "@/hooks/use-toast";
import { formatCurrency } from "@/lib/utils";

export default function AccountPage() {
  const { toast } = useToast();
  const { isLoggedIn, userName, userEmail, rewardPoints, login, signup, logout } = useAuthStore();
  const orderHistory = useOrderStore((s) => s.orderHistory);

  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [signupForm, setSignupForm] = useState({ name: "", email: "", password: "" });
  const [forgotEmail, setForgotEmail] = useState("");
  const [showForgot, setShowForgot] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(loginForm.email, loginForm.password);
    toast("Welcome back!", "success");
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    signup(signupForm.name, signupForm.email, signupForm.password);
    toast("Account created! +500 reward points", "success");
  };

  const handleForgot = (e: React.FormEvent) => {
    e.preventDefault();
    toast(`Reset link sent to ${forgotEmail}`, "info");
    setShowForgot(false);
  };

  if (isLoggedIn) {
    return (
      <PageTransition>
        <div className="mx-auto max-w-4xl px-4 pt-32 pb-24 sm:px-6">
          <FadeIn>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="font-display text-3xl font-bold text-white">
                  Hey, <span className="gradient-text capitalize">{userName}</span>
                </h1>
                <p className="text-white/50 mt-1">{userEmail}</p>
              </div>
              <Button variant="outline" onClick={() => { logout(); toast("Logged out", "info"); }}>
                <LogOut className="h-4 w-4" /> Logout
              </Button>
            </div>
          </FadeIn>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <GlassCard hover={false} className="text-center">
              <Gift className="h-8 w-8 text-orange-400 mx-auto" />
              <p className="font-display text-2xl font-bold text-white mt-2">{rewardPoints}</p>
              <p className="text-xs text-white/40">Reward Points</p>
            </GlassCard>
            <GlassCard hover={false} className="text-center">
              <History className="h-8 w-8 text-orange-400 mx-auto" />
              <p className="font-display text-2xl font-bold text-white mt-2">{orderHistory.length}</p>
              <p className="text-xs text-white/40">Total Orders</p>
            </GlassCard>
            <GlassCard hover={false} className="text-center">
              <MapPin className="h-8 w-8 text-orange-400 mx-auto" />
              <p className="font-display text-2xl font-bold text-white mt-2">2</p>
              <p className="text-xs text-white/40">Saved Addresses</p>
            </GlassCard>
          </div>

          <FadeIn delay={0.1} className="mt-8">
            <Tabs defaultValue="orders">
              <TabsList className="w-full">
                <TabsTrigger value="orders" className="flex-1">Order History</TabsTrigger>
                <TabsTrigger value="addresses" className="flex-1">Addresses</TabsTrigger>
                <TabsTrigger value="payments" className="flex-1">Payments</TabsTrigger>
              </TabsList>
              <TabsContent value="orders" className="mt-4 space-y-3">
                {orderHistory.length === 0 ? (
                  <GlassCard hover={false} className="text-center py-8">
                    <p className="text-white/40">No orders yet. Time to get some pizza!</p>
                  </GlassCard>
                ) : (
                  orderHistory.map((order) => (
                    <GlassCard key={order.id} hover={false} className="flex justify-between items-center">
                      <div>
                        <p className="font-mono text-sm text-orange-400">{order.id}</p>
                        <p className="text-xs text-white/40 mt-1">{new Date(order.createdAt).toLocaleDateString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-white">{formatCurrency(order.total)}</p>
                        <p className="text-xs text-green-400 capitalize">{order.status}</p>
                      </div>
                    </GlassCard>
                  ))
                )}
              </TabsContent>
              <TabsContent value="addresses" className="mt-4 space-y-3">
                {["123 Main St, NY 10001", "456 Oak Ave, NY 10002"].map((addr) => (
                  <GlassCard key={addr} hover={false} className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-orange-400 shrink-0" />
                    <span className="text-sm text-white/70">{addr}</span>
                  </GlassCard>
                ))}
              </TabsContent>
              <TabsContent value="payments" className="mt-4 space-y-3">
                <GlassCard hover={false} className="flex items-center gap-3">
                  <CreditCard className="h-5 w-5 text-orange-400" />
                  <div>
                    <p className="text-sm text-white">Visa ending in 4242</p>
                    <p className="text-xs text-white/40">Expires 12/28</p>
                  </div>
                </GlassCard>
              </TabsContent>
            </Tabs>
          </FadeIn>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="mx-auto max-w-md px-4 pt-32 pb-24">
        <FadeIn className="text-center mb-8">
          <h1 className="font-display text-3xl font-bold text-white">Account</h1>
          <p className="text-white/50 mt-2">Sign in or create an account</p>
        </FadeIn>

        <AnimatePresence mode="wait">
          {showForgot ? (
            <motion.div key="forgot" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <GlassCard hover={false}>
                <h2 className="font-display font-semibold text-white mb-4">Reset Password</h2>
                <form onSubmit={handleForgot} className="space-y-4">
                  <div>
                    <Label>Email</Label>
                    <Input type="email" value={forgotEmail} onChange={(e) => setForgotEmail(e.target.value)} required className="mt-1.5" />
                  </div>
                  <Button type="submit" className="w-full">Send Reset Link</Button>
                  <Button type="button" variant="ghost" className="w-full" onClick={() => setShowForgot(false)}>Back to Login</Button>
                </form>
              </GlassCard>
            </motion.div>
          ) : (
            <motion.div key="auth" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Tabs defaultValue="login">
                <TabsList className="w-full mb-6">
                  <TabsTrigger value="login" className="flex-1">Login</TabsTrigger>
                  <TabsTrigger value="signup" className="flex-1">Sign Up</TabsTrigger>
                </TabsList>
                <TabsContent value="login">
                  <GlassCard hover={false}>
                    <form onSubmit={handleLogin} className="space-y-4">
                      <div>
                        <Label>Email</Label>
                        <div className="relative mt-1.5">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
                          <Input type="email" value={loginForm.email} onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })} className="pl-10" required />
                        </div>
                      </div>
                      <div>
                        <Label>Password</Label>
                        <div className="relative mt-1.5">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
                          <Input type="password" value={loginForm.password} onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })} className="pl-10" required />
                        </div>
                      </div>
                      <button type="button" onClick={() => setShowForgot(true)} className="text-xs text-orange-400 hover:text-orange-300">Forgot password?</button>
                      <Button type="submit" className="w-full">Sign In</Button>
                    </form>
                  </GlassCard>
                </TabsContent>
                <TabsContent value="signup">
                  <GlassCard hover={false}>
                    <form onSubmit={handleSignup} className="space-y-4">
                      <div>
                        <Label>Full Name</Label>
                        <div className="relative mt-1.5">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
                          <Input value={signupForm.name} onChange={(e) => setSignupForm({ ...signupForm, name: e.target.value })} className="pl-10" required />
                        </div>
                      </div>
                      <div>
                        <Label>Email</Label>
                        <div className="relative mt-1.5">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
                          <Input type="email" value={signupForm.email} onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })} className="pl-10" required />
                        </div>
                      </div>
                      <div>
                        <Label>Password</Label>
                        <div className="relative mt-1.5">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
                          <Input type="password" value={signupForm.password} onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })} className="pl-10" required />
                        </div>
                      </div>
                      <Button type="submit" className="w-full">Create Account</Button>
                    </form>
                  </GlassCard>
                </TabsContent>
              </Tabs>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  );
}
