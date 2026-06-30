// Project inventory. Single source of truth for the home featured strip,
// /projects index, and /projects/[slug] case studies.
//
// Tier 1: featured on home + has case study.
// Tier 2: case study only, listed on /projects.
// Tier 3: deferred — present in source but `tier: 3` projects are not rendered
//   anywhere yet. Promote to tier 2 when the project ships.
//
// To add a project: append an object below. Slugs become URLs at
// /projects/[slug] and are required to be unique + URL-safe.

import type { Language } from "@/lib/language-colors";

export type ProjectStatus = "shipped" | "in-development" | "private";
export type ProjectCategory = "dev" | "fab" | "music";
export type ProjectTier = 1 | 2 | 3;

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  /** Long-form first-person description. Markdown-style line breaks ok. */
  description: string;
  tech: string[];
  /** Drives the per-language color dot. Optional for non-code projects. */
  language?: Language;
  /** Public link — deployed site preferred, repo if no deploy. */
  url?: string;
  /** Repo link — separate from `url` because some projects are private. */
  repoUrl?: string;
  status: ProjectStatus;
  tier: ProjectTier;
  category: ProjectCategory;
  /** One-line "current state" — e.g. "ships june 1", "currently building". */
  highlight?: string;
  /** Paths under /public/projects/[slug]/. First image is the hero. */
  screenshots?: string[];
};

export const projects: Project[] = [
  // -------------------------------------------------------------------------
  // TIER 1
  // -------------------------------------------------------------------------
  {
    slug: "cincin",
    name: "cincin",
    tagline: "restaurant reservations, automated.",
    description: `cincin is the project i'm pouring most of my time into right now. it's an intelligent reservation bot for restaurants — handles availability, confirms bookings, talks to guests in plain language. the goal is to take the most annoying part of running a small restaurant and make it disappear.

private repo for now. happy to talk about the architecture and the model choices if you ping me.`,
    tech: ["TypeScript", "Next.js", "AI"],
    language: "TypeScript",
    url: "https://cincin.vip",
    status: "in-development",
    tier: 1,
    category: "dev",
    highlight: "currently building",
  },
  {
    slug: "austin-stem-center",
    name: "austin stem center",
    tagline: "nonprofit innovation hub for hands-on stem in austin.",
    description: `i built the marketing + program site for the austin stem center, a nonprofit opening june 2026. ten pages: home, about, programs (field trips, summer camps, pre-apprenticeship, professional development), facilities, blog, and contact.

most of the work was about making complex program info legible to four different audiences (parents, schools, donors, professionals) without the page feeling like a brochure. all of it is open source.`,
    tech: ["TypeScript", "Next.js", "Tailwind"],
    language: "TypeScript",
    url: "https://atxstem.org",
    repoUrl: "https://github.com/jwilli-asc/asc_web",
    status: "in-development",
    tier: 1,
    category: "dev",
    highlight: "ships june 1, 2026",
  },

  // -------------------------------------------------------------------------
  // TIER 2
  // -------------------------------------------------------------------------
  {
    slug: "digiboard",
    name: "digiboard",
    tagline: "a vestaboard, rebuilt for the browser.",
    description: `a browser version of a vestaboard — those mechanical split-flap displays from train stations and design-y lobbies. type a message and watch it flutter into place one character at a time, with the mechanical clatter if you leave the sound on.

compose with color chips, swap between board sizes, and control alignment down to the block. message history and your theme persist locally. a real vestaboard runs about three grand; this one's free and lives in a tab.`,
    tech: ["TypeScript", "Next.js", "Tailwind"],
    language: "TypeScript",
    url: "https://digiboard-taupe.vercel.app",
    repoUrl: "https://github.com/jwilli97/DigiBoard",
    status: "shipped",
    tier: 2,
    category: "dev",
  },
  {
    slug: "tz-clock",
    name: "tz-clock",
    tagline: "a terminal timezone dashboard with weather.",
    description: `a small python curses app that shows the time across timezones with live weather, designed to live in a tmux pane. zero external dependencies — just python 3.9+ and the system zoneinfo. i use it every day.

the visual style of this site borrows directly from this project. the box-drawing frame on the home page is a tribute.`,
    tech: ["Python", "curses"],
    language: "Python",
    repoUrl: "https://github.com/jwilli97/ascii-clock",
    status: "shipped",
    tier: 2,
    category: "dev",
  },
  {
    slug: "tinytrees-atx",
    name: "tinytrees atx",
    tagline: "small storefront for a local austin shop.",
    description: `a deployed next.js storefront for a local shop in austin. small project, but a useful exercise in shipping something real for someone other than me.`,
    tech: ["TypeScript", "Next.js"],
    language: "TypeScript",
    url: "https://atx-store-pi.vercel.app",
    repoUrl: "https://github.com/Lebowski97/atx",
    status: "shipped",
    tier: 2,
    category: "dev",
  },
];

// -------------------------------------------------------------------------
// QUERIES
// -------------------------------------------------------------------------

/** Visible projects (tier 1 or 2). Tier 3 are hidden until promoted. */
export function getVisibleProjects(): Project[] {
  return projects.filter((p) => p.tier !== 3);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.tier === 1);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/** For Next's generateStaticParams. */
export function getAllSlugs(): string[] {
  return getVisibleProjects().map((p) => p.slug);
}
