import { ImageResponse } from "next/og";
import { getContent } from "@/lib/content";
import { defaultLocale, hasLocale } from "@/lib/i18n";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Andrés Monserrat — Software Engineer";

export default async function OpengraphImage(props: { params: Promise<{ lang: string }> }) {
  const { lang } = await props.params;
  const { profile } = getContent(hasLocale(lang) ? lang : defaultLocale);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#f4f2ec",
          color: "#101827",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 24, fontFamily: "monospace", color: "#3d5a4c" }}>
          <div style={{ width: 12, height: 12, borderRadius: 999, background: "#3d5a4c" }} />
          {profile.availability}
        </div>

        <div style={{ display: "flex", marginTop: 28, fontSize: 96, fontWeight: 700, letterSpacing: -3 }}>
          {profile.name}
          <span style={{ color: "#d78b65" }}>.</span>
        </div>

        <div style={{ display: "flex", marginTop: 12, fontSize: 40 }}>{`${profile.roleLead} ${profile.roleSparkle}`}</div>

        <div style={{ display: "flex", marginTop: 40, fontSize: 26, fontFamily: "monospace", color: "#555e6e" }}>
          {profile.pillars.join(" · ")}
        </div>
      </div>
    ),
    size,
  );
}
