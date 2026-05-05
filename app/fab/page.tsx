import type { Metadata } from "next";
import { PageNav } from "@/components/page-nav";
import { EmptyState } from "@/components/empty-state";

export const metadata: Metadata = {
  title: "fab",
  description:
    "fusion 360 designs and bambu 3d prints — coming next week once i'm back at the shop.",
};

export default function FabPage() {
  return (
    <>
      <PageNav />
      <main className="max-w-5xl mx-auto px-4 py-12 sm:py-20">
        <header className="mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
            fab
          </h1>
          <p className="text-muted-foreground/70 font-mono text-sm">
            fusion 360 designs + bambu prints.
          </p>
        </header>

        <EmptyState
          command="ls ./fab"
          hint="~30 designs and prints inbound. back at the shop next week."
        />
      </main>
    </>
  );
}
