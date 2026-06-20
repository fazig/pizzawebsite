"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-4 pt-24 text-center">
      <p className="text-6xl mb-4">🔥</p>
      <h1 className="font-display text-2xl font-bold text-white">Something went wrong</h1>
      <p className="mt-2 text-white/50 max-w-md">
        Our kitchen hit an unexpected snag. Please try again.
      </p>
      <Button className="mt-8" size="lg" onClick={reset}>
        Try Again
      </Button>
    </div>
  );
}
