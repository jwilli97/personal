"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { IconLock } from "@tabler/icons-react";
import type { Project } from "@/lib/projects";
import { getLanguageColor } from "@/lib/language-colors";

// =============================================================================
// ANIMATION
// =============================================================================

const smoothEase = [0.25, 0.1, 0.25, 1] as const;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.04 },
  },
};

const rowVariants = {
  hidden: { opacity: 0, x: -8 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, ease: smoothEase },
  },
};

const STATUS_LABEL: Record<Project["status"], string> = {
  shipped: "shipped",
  "in-development": "building",
  private: "private",
};

// =============================================================================
// LISTING
// =============================================================================

/**
 * Terminal `ls`-style project listing. Each project is one monospace row:
 *   ›  ● name            tagline ............... status
 * The leading caret + row highlight mimic a selected line in a TUI.
 */
export function ProjectListing({ projects }: { projects: Project[] }) {
  return (
    <motion.ul
      className="font-mono text-sm"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      {projects.map((p) => {
        const colors = getLanguageColor(p.language);
        const isPrivate = p.status === "private" || (!p.url && !p.repoUrl);
        const meta = p.highlight ?? STATUS_LABEL[p.status];

        return (
          <motion.li key={p.slug} variants={rowVariants}>
            <Link
              href={`/projects/${p.slug}`}
              style={{ "--lang": colors.accent } as React.CSSProperties}
              className="group grid grid-cols-[auto_auto_1fr] sm:grid-cols-[auto_minmax(0,12rem)_1fr_auto] items-baseline gap-x-3 -mx-2 px-2 py-2 rounded-sm hover:bg-muted/30 transition-colors"
            >
              <span className="text-primary/30 group-hover:text-primary/80 transition-colors">
                &gt;
              </span>

              <span className="flex items-center gap-2 min-w-0">
                <span
                  className="size-2 rounded-full shrink-0 transition-transform group-hover:scale-125"
                  style={{ backgroundColor: colors.accent }}
                  aria-hidden
                />
                <span className="truncate text-foreground transition-colors group-hover:text-[var(--lang)]">
                  {p.name}
                </span>
              </span>

              <span className="hidden sm:block truncate text-muted-foreground/50">
                {p.tagline}
              </span>

              <span className="col-start-3 sm:col-start-4 flex items-center gap-1.5 justify-self-start sm:justify-self-end text-xs text-muted-foreground/40">
                {isPrivate && <IconLock className="size-3" aria-hidden />}
                {meta}
              </span>
            </Link>
          </motion.li>
        );
      })}
    </motion.ul>
  );
}
