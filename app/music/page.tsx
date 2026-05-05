import type { Metadata } from "next";
import { PageNav } from "@/components/page-nav";
import { EmptyState } from "@/components/empty-state";

export const metadata: Metadata = {
  title: "music",
  description: "tracks i've been working on. uploads pending.",
};

export default function MusicPage() {
  return (
    <>
      <PageNav />
      <main className="max-w-5xl mx-auto px-4 py-12 sm:py-20">
        <header className="mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
            music
          </h1>
          <p className="text-muted-foreground/70 font-mono text-sm">
            production + releases.
          </p>
        </header>

        <EmptyState
          command="ls ./music"
          hint="~10 tracks queued. uploads happening once i'm back home."
        />
      </main>
    </>
  );
}
