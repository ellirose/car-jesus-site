/* eslint-disable @next/next/no-img-element -- Satori renders plain <img> elements */
import { ImageResponse } from "next/og";
import { logoMarkSvg, svgDataUrl } from "@/lib/brand-art";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** iOS home-screen icon: the Solara mark, full-bleed (iOS applies its own mask). */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: "#2b57e0" }}>
        <img src={svgDataUrl(logoMarkSvg)} width={180} height={180} alt="" />
      </div>
    ),
    size,
  );
}
