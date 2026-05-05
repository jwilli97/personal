import Link from "next/link";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconMail,
} from "@tabler/icons-react";

const YEAR = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="border-t border-border/40 mt-24">
      <div className="max-w-5xl mx-auto px-4 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs text-muted-foreground/70">
        <div className="flex flex-col gap-1">
          <span>
            <span className="text-muted-foreground/40">©</span> {YEAR} Joseph
            Williams
          </span>
          <Link
            href="/"
            className="text-muted-foreground/50 hover:text-primary transition-colors"
          >
            jwilli.dev
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/jwilli97"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="github"
            className="hover:text-primary transition-colors"
          >
            <IconBrandGithub className="size-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/jwilli97"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="linkedin"
            className="hover:text-primary transition-colors"
          >
            <IconBrandLinkedin className="size-4" />
          </a>
          <a
            href="mailto:hi@jwilli.dev"
            aria-label="email"
            className="hover:text-primary transition-colors"
          >
            <IconMail className="size-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
