import { ImageResponse } from "next/og";
import { getAllSlugs, getProjectBySlug } from "@/lib/projects";

export const alt = "jwilli.dev project";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateImageMetadata() {
  return getAllSlugs().map((slug) => ({ id: slug, params: { slug } }));
}

export default async function ProjectOgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0a0e1a",
          color: "#5fb3ff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 24,
              color: "#5a6478",
              letterSpacing: "0.2em",
            }}
          >
            JWILLI.DEV / PROJECT
          </div>
          <div
            style={{
              fontSize: 110,
              fontWeight: 700,
              letterSpacing: "-0.04em",
              lineHeight: 1,
              marginTop: 32,
              color: "#e8eef8",
            }}
          >
            {project?.name ?? slug}
          </div>
          <div
            style={{
              fontSize: 32,
              color: "#9aa4b8",
              marginTop: 24,
              maxWidth: 980,
            }}
          >
            {project?.tagline ?? ""}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 22,
            color: "#5a6478",
          }}
        >
          <span>{project?.tech.join(" · ") ?? ""}</span>
          <span>— Joseph Williams</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
