"use client";

import { ReactNode, useEffect } from "react";
import { CustomCursor } from "@/components/effects/custom-cursor";
import { ToastProvider } from "@/hooks/use-toast";
import { rehydrateStores } from "@/lib/store";

export function Providers({ children }: { children: ReactNode }) {
  useEffect(() => {
    rehydrateStores();
  }, []);

  return (
    <ToastProvider>
      <CustomCursor />
      {children}
    </ToastProvider>
  );
}
