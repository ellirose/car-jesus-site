/* eslint-disable @next/next/no-img-element -- Satori renders plain <img> elements */
import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { flagSvgs, logoMarkSvg, svgDataUrl } from "@/lib/brand-art";

export const alt = "Solara Autos — Seminuevos certificados en México. Vende o cambia tu auto en menos de 24 horas.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const root = process.cwd();

// Read at module scope so the image is generated once at build time.
const [soraBold, soraSemi, jakarta, car] = await Promise.all([
  readFile(join(root, "src/assets/fonts/Sora-ExtraBold.ttf")),
  readFile(join(root, "src/assets/fonts/Sora-SemiBold.ttf")),
  readFile(join(root, "src/assets/fonts/PlusJakartaSans-SemiBold.ttf")),
  readFile(join(root, "public/media/images/car-4.jpg")),
]);
const carUrl = `data:image/jpeg;base64,${car.toString("base64")}`;

export default async function OpengraphImage() {
  const chip = (label: string, dot: string) => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "12px 20px",
        borderRadius: 999,
        background: "rgba(255,255,255,0.85)",
        border: "1px solid #ffffff",
        boxShadow: "0 10px 24px -12px rgba(19,33,58,0.25)",
        fontFamily: "Jakarta",
        fontSize: 20,
        color: "#13213a",
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
          backgroundColor: "#f7f5f1",
          backgroundImage:
            "radial-gradient(circle at 8% 0%, rgba(255,192,112,0.7), rgba(255,192,112,0) 48%), radial-gradient(circle at 100% 100%, rgba(141,178,255,0.5), rgba(141,178,255,0) 50%)",
          fontFamily: "Sora",
          overflow: "hidden",
        }}
      >
        {/* copy */}
        <div style={{ display: "flex", flexDirection: "column", padding: "60px 0 56px 72px", width: 720, position: "relative" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <img src={svgDataUrl(logoMarkSvg)} width={76} height={76} alt="" />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: 46, fontWeight: 800, color: "#13213a", lineHeight: 1 }}>Solara</div>
              <div style={{ fontSize: 15, fontWeight: 600, color: "#f26b12", letterSpacing: 9, marginTop: 6 }}>AUTOS</div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 40,
              alignSelf: "flex-start",
              alignItems: "center",
              padding: "12px 20px",
              lineHeight: 1,
              borderRadius: 999,
              background: "#fff7ec",
              border: "1px solid #ffd8a6",
              color: "#c9510d",
              fontFamily: "Jakarta",
              fontSize: 18,
              letterSpacing: 3,
            }}
          >
            SEMINUEVOS CERTIFICADOS · MÉXICO
          </div>

          <div style={{ display: "flex", flexDirection: "column", marginTop: 24, fontSize: 54, fontWeight: 800, lineHeight: 1.08, letterSpacing: -2.2 }}>
            <div style={{ color: "#13213a" }}>Vende o cambia tu auto</div>
            <div
              style={{
                backgroundImage: "linear-gradient(100deg, #ffb13d 0%, #ff7a1a 45%, #e8461b 100%)",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              en menos de 24 horas
            </div>
          </div>

          <div style={{ display: "flex", gap: 12, marginTop: 30 }}>
            {chip("Garantía 12 meses", "#14b88b")}
            {chip("Crédito en 24 h", "#3f7bfa")}
            {chip("Avalúo gratis", "#ff8a1f")}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: "auto" }}>
            {(["es", "en", "pt"] as const).map((l) => (
              <img key={l} src={svgDataUrl(flagSvgs[l])} width={40} height={40} alt="" />
            ))}
            <div style={{ fontFamily: "Jakarta", fontSize: 20, color: "#46546d", marginLeft: 6 }}>Español · English · Português</div>
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
              border: "3px dashed rgba(255,165,63,0.55)",
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
              boxShadow: "0 40px 80px -30px rgba(19,33,58,0.45)",
            }}
          >
            <img src={carUrl} alt="" width={360} height={498} style={{ objectFit: "cover", objectPosition: "45% 60%" }} />
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
              background: "rgba(255,255,255,0.92)",
              border: "1px solid #ffffff",
              boxShadow: "0 24px 50px -20px rgba(19,33,58,0.45)",
            }}
          >
            <div style={{ fontSize: 50, fontWeight: 800, color: "#f26b12", lineHeight: 1 }}>24 h</div>
            <div style={{ fontFamily: "Jakarta", fontSize: 15, color: "#46546d", marginTop: 6 }}>oferta garantizada</div>
          </div>
          <div
            style={{
              display: "flex",
              position: "absolute",
              right: -26,
              top: 70,
              padding: "12px 20px",
              borderRadius: 999,
              background: "linear-gradient(135deg, #ffc24b, #ff8a1f 48%, #f0561a)",
              color: "#fff",
              fontSize: 22,
              fontWeight: 800,
              boxShadow: "0 16px 30px -12px rgba(255,122,26,0.8)",
            }}
          >
            4.9 ★ Google
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
