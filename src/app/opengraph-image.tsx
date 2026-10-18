/* eslint-disable @next/next/no-img-element -- Satori renders plain <img> elements */
import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { flagSvgs, flowLinesSvg, logoMarkSvg, svgDataUrl } from "@/lib/brand-art";

export const alt = "Solara Autos — Seminuevos certificados en México. Vende o cambia tu auto en menos de 24 horas.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const root = process.cwd();

// Read at module scope so the image is generated once at build time.
const [soraBold, soraSemi, jakarta, car] = await Promise.all([
  readFile(join(root, "src/assets/fonts/Sora-ExtraBold.ttf")),
  readFile(join(root, "src/assets/fonts/Sora-SemiBold.ttf")),
  readFile(join(root, "src/assets/fonts/PlusJakartaSans-SemiBold.ttf")),
  readFile(join(root, "public/media/images/car-2.jpg")),
]);
const carUrl = `data:image/jpeg;base64,${car.toString("base64")}`;

const ink = "#101d33";
const inkSoft = "#4a5874";
const brand = "#2b57e0";
const aqua = "#19b5be";

export default async function OpengraphImage() {
  const chip = (label: string, dot: string) => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "12px 20px",
        borderRadius: 999,
        background: "#ffffff",
        border: "1px solid #dde5ef",
        fontFamily: "Jakarta",
        fontSize: 20,
        color: ink,
      }}
    >
      <div style={{ width: 10, height: 10, borderRadius: 99, background: dot }} />
      {label}
    </div>
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          backgroundColor: "#f5f8fc",
          fontFamily: "Sora",
          overflow: "hidden",
        }}
      >
        <img src={svgDataUrl(flowLinesSvg)} width={1200} height={630} alt="" style={{ position: "absolute", top: 0, left: 0 }} />

        {/* copy */}
        <div style={{ display: "flex", flexDirection: "column", padding: "60px 0 56px 72px", width: 720, position: "relative" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <img src={svgDataUrl(logoMarkSvg)} width={76} height={76} alt="" />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: 46, fontWeight: 800, color: ink, lineHeight: 1 }}>Solara</div>
              <div style={{ fontSize: 15, fontWeight: 600, color: brand, letterSpacing: 9, marginTop: 6 }}>AUTOS</div>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 44 }}>
            <div style={{ width: 40, height: 2, background: brand }} />
            <div style={{ fontFamily: "Jakarta", fontSize: 18, letterSpacing: 4, color: brand }}>SEMINUEVOS CERTIFICADOS · MÉXICO</div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", marginTop: 22, fontSize: 54, fontWeight: 600, lineHeight: 1.1, letterSpacing: -2 }}>
            <div style={{ color: ink }}>Vende o cambia tu auto</div>
            <div style={{ display: "flex", color: brand, borderBottom: "3px solid #7edfe3", alignSelf: "flex-start", paddingBottom: 4 }}>
              en menos de 24 horas
            </div>
          </div>

          <div style={{ display: "flex", gap: 12, marginTop: 32 }}>
            {chip("Garantía 12 meses", "#14b892")}
            {chip("Crédito en 24 h", aqua)}
            {chip("Avalúo gratis", brand)}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: "auto" }}>
            {(["es", "en", "pt"] as const).map((l) => (
              <img key={l} src={svgDataUrl(flagSvgs[l])} width={40} height={40} alt="" />
            ))}
            <div style={{ fontFamily: "Jakarta", fontSize: 20, color: inkSoft, marginLeft: 6 }}>Español · English · Português</div>
          </div>
        </div>

        {/* arch photo */}
        <div style={{ display: "flex", position: "absolute", right: 64, top: 56, width: 380, height: 518 }}>
          <div
            style={{
              display: "flex",
              position: "absolute",
              left: -40,
              top: -20,
              width: 460,
              height: 460,
              borderRadius: 999,
              border: "1.5px dashed #95b6ff",
            }}
          />
          <div
            style={{
              display: "flex",
              width: 380,
              height: 518,
              borderRadius: "190px 190px 44px 44px",
              border: "10px solid #ffffff",
              overflow: "hidden",
              boxShadow: "0 40px 80px -30px rgba(16,29,51,0.4)",
            }}
          >
            <img src={carUrl} alt="" width={360} height={498} style={{ objectFit: "cover", objectPosition: "38% 55%" }} />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              position: "absolute",
              left: -44,
              bottom: 18,
              width: 160,
              height: 160,
              borderRadius: 999,
              background: "#ffffff",
              border: "1px solid #dde5ef",
              boxShadow: "0 24px 50px -20px rgba(16,29,51,0.35)",
            }}
          >
            <div style={{ fontSize: 50, fontWeight: 600, color: brand, lineHeight: 1 }}>24 h</div>
            <div style={{ fontFamily: "Jakarta", fontSize: 15, color: inkSoft, marginTop: 6 }}>oferta garantizada</div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "absolute",
              right: -30,
              top: 60,
              width: 132,
              height: 132,
              borderRadius: 999,
              background: aqua,
              color: "#ffffff",
              fontSize: 26,
              fontWeight: 600,
              boxShadow: "0 16px 30px -12px rgba(25,181,190,0.7)",
            }}
          >
            4.9 ★
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Sora", data: soraBold, weight: 800, style: "normal" },
        { name: "Sora", data: soraSemi, weight: 600, style: "normal" },
        { name: "Jakarta", data: jakarta, weight: 600, style: "normal" },
      ],
    },
  );
}
