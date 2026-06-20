import Link from "next/link";
import { Flame, Github, Instagram, Twitter } from "lucide-react";
import { SITE_CONFIG, NAV_LINKS } from "@/constants/navigation";

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-white/5">
      <div className="absolute inset-0 bg-gradient-to-t from-orange-500/5 to-transparent pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#ff6b2c] to-[#ff2d2d]">
                <Flame className="h-5 w-5 text-white" />
              </div>
              <span className="font-display text-xl font-bold text-white">
                {SITE_CONFIG.name}
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm text-white/50 leading-relaxed">
              {SITE_CONFIG.description}
            </p>
            <div className="mt-6 flex gap-4">
              {[Twitter, Instagram, Github].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-xl glass text-white/50 transition-all hover:text-orange-400 hover:border-orange-500/30"
                  aria-label="Social link"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold text-white mb-4">Navigate</h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 transition-colors hover:text-orange-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-white mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-white/50">
              <li>{SITE_CONFIG.address}</li>
              <li>{SITE_CONFIG.phone}</li>
              <li>{SITE_CONFIG.email}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 sm:flex-row">
          <p className="text-xs text-white/30">
            &copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-white/30">
            <Link href="/about" className="hover:text-white/60">Privacy</Link>
            <Link href="/contact" className="hover:text-white/60">Terms</Link>
            <Link href="/admin" className="hover:text-white/60">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
