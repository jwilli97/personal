"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const ROUTES: { href: string; label: string }[] = [
  { href: "/", label: "home" },
  { href: "/projects", label: "projects" },
  { href: "/fab", label: "fab" },
  { href: "/music", label: "music" },
];

export function PageNav() {
  const pathname = usePathname();

  return (
    <nav className="border-b border-border/40">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center gap-6 font-mono text-sm">
        <Link
          href="/"
          className="text-primary hover:text-primary/80 transition-colors font-bold"
        >
          jwilli.dev
        </Link>
        <div className="flex items-center gap-4 text-muted-foreground/60">
          {ROUTES.slice(1).map((r) => {
            const active =
              pathname === r.href || pathname.startsWith(`${r.href}/`);
            return (
              <Link
                key={r.href}
                href={r.href}
                className={cn(
                  "hover:text-primary transition-colors",
                  active && "text-primary",
                )}
              >
                {r.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
