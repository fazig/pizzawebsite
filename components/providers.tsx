"use client";

import { ReactNode } from "react";
import { CustomCursor } from "@/components/effects/custom-cursor";
import { ToastProvider } from "@/hooks/use-toast";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ToastProvider>
      <CustomCursor />
      {children}
    </ToastProvider>
  );
}
