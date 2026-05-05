import { ImageResponse } from "next/og";

export const alt = "jwilli.dev — Joseph Williams";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
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
          justifyContent: "center",
          padding: "80px",
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
        }}
      >
        <div
          style={{
            fontSize: 140,
            fontWeight: 700,
            letterSpacing: "-0.04em",
            lineHeight: 1,
          }}
        >
          jwilli.dev
        </div>
        <div
          style={{
            fontSize: 36,
            color: "#9aa4b8",
            marginTop: 24,
          }}
        >
          Joseph Williams
        </div>
        <div
          style={{
            fontSize: 28,
            color: "#5a6478",
            marginTop: 60,
          }}
        >
          $ software engineer + musician
        </div>
        <div
          style={{
            display: "flex",
            gap: 12,
            marginTop: 40,
            fontSize: 22,
            color: "#5fb3ff",
          }}
        >
          <span style={{ color: "#5a6478" }}>&gt;</span>
          <span>building cincin · shipping austin stem center</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
