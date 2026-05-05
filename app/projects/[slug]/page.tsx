import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  IconArrowLeft,
  IconArrowRight,
  IconExternalLink,
  IconBrandGithub,
  IconLock,
} from "@tabler/icons-react";
import { PageNav } from "@/components/page-nav";
import { Badge } from "@/components/ui/badge";
import {
  getAllSlugs,
  getProjectBySlug,
  getVisibleProjects,
} from "@/lib/projects";
import { getLanguageColor } from "@/lib/language-colors";

type Params = { slug: string };

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: project.name,
    description: project.tagline,
    openGraph: {
      title: `${project.name} — jwilli.dev`,
      description: project.tagline,
      type: "article",
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const visible = getVisibleProjects();
  const idx = visible.findIndex((p) => p.slug === project.slug);
  const prev = idx > 0 ? visible[idx - 1] : null;
  const next = idx < visible.length - 1 ? visible[idx + 1] : null;

  const colors = getLanguageColor(project.language);
  const isPrivate = project.status === "private";

  const statusLabel: Record<typeof project.status, string> = {
    shipped: "shipped",
    "in-development": "in development",
    private: "private",
  };

  return (
    <>
      <PageNav />
      <main className="max-w-3xl mx-auto px-4 py-12 sm:py-20">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 font-mono text-xs text-muted-foreground/60 hover:text-primary transition-colors mb-12"
        >
          <IconArrowLeft className="size-3" />
          all projects
        </Link>

        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4 font-mono text-xs">
            <span
              className="size-2 rounded-full"
              style={{ backgroundColor: colors.accent }}
            />
            <span className="uppercase tracking-widest text-muted-foreground/60">
              {project.category}
            </span>
            <span className="text-muted-foreground/30">/</span>
            <span className="text-muted-foreground/60">
              {statusLabel[project.status]}
            </span>
            {project.highlight && (
              <>
                <span className="text-muted-foreground/30">/</span>
                <span className="text-primary/70">{project.highlight}</span>
              </>
            )}
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-foreground tracking-tight mb-3">
            {project.name}
          </h1>
          <p className="text-lg text-muted-foreground">{project.tagline}</p>
        </header>

        {/* Description */}
        <article className="prose prose-invert max-w-none mb-10">
          {project.description.split("\n\n").map((para, i) => (
            <p
              key={i}
              className="text-muted-foreground leading-relaxed mb-4 whitespace-pre-line"
            >
              {para}
            </p>
          ))}
        </article>

        {/* Tech */}
        {project.tech.length > 0 && (
          <section className="mb-10">
            <div className="flex items-baseline gap-3 mb-3 font-mono">
              <span className="text-xs uppercase tracking-widest text-primary/60">
                stack
              </span>
              <div className="flex-1 h-px bg-border/40" />
            </div>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <Badge
                  key={t}
                  variant="outline"
                  className="font-mono text-xs border-border/60 text-muted-foreground"
                >
                  {t}
                </Badge>
              ))}
            </div>
          </section>
        )}

        {/* Links */}
        <section className="mb-16 flex flex-wrap gap-3 font-mono text-sm">
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 border border-primary/30 hover:border-primary/60 text-primary hover:bg-primary/5 transition-colors"
            >
              <IconExternalLink className="size-4" />
              live site
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 border border-border hover:border-foreground/40 text-muted-foreground hover:text-foreground transition-colors"
            >
              <IconBrandGithub className="size-4" />
              repo
            </a>
          )}
          {isPrivate && !project.url && (
            <span className="inline-flex items-center gap-2 px-4 py-2 border border-border/60 text-muted-foreground/60">
              <IconLock className="size-4" />
              private — ask me about it
            </span>
          )}
        </section>

        {/* Prev / next */}
        <nav
          aria-label="other projects"
          className="grid grid-cols-2 gap-4 pt-8 border-t border-border/40 font-mono text-xs"
        >
          {prev ? (
            <Link
              href={`/projects/${prev.slug}`}
              className="group text-left text-muted-foreground/60 hover:text-primary transition-colors"
            >
              <div className="flex items-center gap-1 mb-1 text-muted-foreground/40">
                <IconArrowLeft className="size-3 group-hover:-translate-x-0.5 transition-transform" />
                prev
              </div>
              <div>{prev.name}</div>
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link
              href={`/projects/${next.slug}`}
              className="group text-right text-muted-foreground/60 hover:text-primary transition-colors"
            >
              <div className="flex items-center justify-end gap-1 mb-1 text-muted-foreground/40">
                next
                <IconArrowRight className="size-3 group-hover:translate-x-0.5 transition-transform" />
              </div>
              <div>{next.name}</div>
            </Link>
          ) : (
            <div />
          )}
        </nav>
      </main>
    </>
  );
}
