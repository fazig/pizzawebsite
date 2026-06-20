import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-4 pt-24 text-center">
      <p className="font-display text-8xl font-bold gradient-text">404</p>
      <h1 className="mt-4 font-display text-2xl font-bold text-white">Page not found</h1>
      <p className="mt-2 text-white/50 max-w-md">
        Looks like this slice got lost in the oven. Let&apos;s get you back on track.
      </p>
      <Link href="/">
        <Button className="mt-8" size="lg">Back to Home</Button>
      </Link>
    </div>
  );
}
