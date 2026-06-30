import type { Metadata } from "next";
import { PageNav } from "@/components/page-nav";
import { ProjectListing } from "@/components/project-listing";
import { getVisibleProjects, type Project } from "@/lib/projects";

export const metadata: Metadata = {
  title: "projects",
  description:
    "things i've built and shipped — cincin, austin stem center, digiboard, tz-clock, and more.",
};

export default function ProjectsPage() {
  const projects = getVisibleProjects();
  const dev = projects.filter((p) => p.category === "dev");
  const music = projects.filter((p) => p.category === "music");
  const fab = projects.filter((p) => p.category === "fab");

  return (
    <>
      <PageNav />
      <main className="max-w-3xl mx-auto px-4 py-12 sm:py-20 font-mono">
        <header className="mb-14">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
            projects
          </h1>
          <p className="text-muted-foreground/70 text-sm">
            {projects.length} things, more in the oven.
          </p>
        </header>

        <Listing dir="dev" projects={dev} />
        <Listing
          dir="fab"
          projects={fab}
          hint="back at the shop soon — fusion 360 + bambu prints incoming."
        />
        <Listing
          dir="music"
          projects={music}
          hint="uploads pending. ~10 tracks queued."
        />
      </main>
    </>
  );
}

function Listing({
  dir,
  projects,
  hint,
}: {
  dir: string;
  projects: Project[];
  hint?: string;
}) {
  return (
    <section className="mb-14">
      <div className="text-sm mb-4">
        <span className="text-primary/60">$</span>{" "}
        <span className="text-muted-foreground/80">ls ./{dir}</span>
        <span className="text-muted-foreground/30">
          {"  "}# {projects.length.toString().padStart(2, "0")}
        </span>
      </div>
      {projects.length > 0 ? (
        <ProjectListing projects={projects} />
      ) : (
        <div className="text-sm">
          <div className="text-muted-foreground/50 italic">
            no such file or directory yet.
          </div>
          {hint && (
            <div className="mt-3 text-xs text-muted-foreground/40">— {hint}</div>
          )}
        </div>
      )}
    </section>
  );
}
