import type { Metadata } from "next";
import { PageNav } from "@/components/page-nav";
import { ProjectGrid } from "@/components/showcase";
import { EmptyState } from "@/components/empty-state";
import { getVisibleProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "projects",
  description:
    "things i've built and shipped — cincin, austin stem center, tz-clock, and more.",
};

export default function ProjectsPage() {
  const projects = getVisibleProjects();
  const dev = projects.filter((p) => p.category === "dev");
  const music = projects.filter((p) => p.category === "music");
  const fab = projects.filter((p) => p.category === "fab");

  return (
    <>
      <PageNav />
      <main className="max-w-5xl mx-auto px-4 py-12 sm:py-20">
        <header className="mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
            projects
          </h1>
          <p className="text-muted-foreground/70 font-mono text-sm">
            {projects.length} things, more in the oven.
          </p>
        </header>

        <section className="mb-16">
          <SectionHeader label="dev" count={dev.length} />
          {dev.length > 0 ? (
            <ProjectGrid projects={dev} />
          ) : (
            <EmptyState command="ls ./dev" />
          )}
        </section>

        <section className="mb-16">
          <SectionHeader label="fab" count={fab.length} />
          {fab.length > 0 ? (
            <ProjectGrid projects={fab} />
          ) : (
            <EmptyState
              command="ls ./fab"
              hint="back at the shop next week. fusion 360 + bambu prints incoming."
            />
          )}
        </section>

        <section className="mb-16">
          <SectionHeader label="music" count={music.length} />
          {music.length > 0 ? (
            <ProjectGrid projects={music} />
          ) : (
            <EmptyState
              command="ls ./music"
              hint="uploads pending. ~10 tracks queued."
            />
          )}
        </section>
      </main>
    </>
  );
}

function SectionHeader({ label, count }: { label: string; count: number }) {
  return (
    <div className="flex items-baseline gap-3 mb-6 font-mono">
      <span className="text-xs uppercase tracking-widest text-primary/60">
        {label}
      </span>
      <span className="text-xs text-muted-foreground/40">
        {count.toString().padStart(2, "0")}
      </span>
      <div className="flex-1 h-px bg-border/40" />
    </div>
  );
}
