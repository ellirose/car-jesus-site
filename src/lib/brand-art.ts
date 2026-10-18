/**
 * Static SVG artwork shared by the generated images (Open Graph, Apple icon).
 * Kept as strings so it can be embedded as data URLs inside `ImageResponse`.
 */
export const logoMarkSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
<rect width="64" height="64" rx="19" fill="#2b57e0"/>
<g stroke="#fff" stroke-width="3" stroke-linecap="round"><line x1="17.71" y1="25.75" x2="13.38" y2="23.25"/><line x1="23.75" y1="19.71" x2="21.25" y2="15.38"/><line x1="32" y1="17.5" x2="32" y2="12.5"/><line x1="40.25" y1="19.71" x2="42.75" y2="15.38"/><line x1="46.29" y1="25.75" x2="50.62" y2="23.25"/></g>
<path d="M20 34a12 12 0 0 1 24 0Z" fill="#fff"/><path d="M10 34.5h44" stroke="#7edfe3" stroke-width="3" stroke-linecap="round"/>
<path d="M22.5 56 30.6 38h2.8l8.1 18Z" fill="#fff"/><path d="M32 40v16" stroke="#2b57e0" stroke-width="1.6" stroke-dasharray="2.4 2.6"/></svg>`;

/** Light-trail contour lines (same motif as components/ui/FlowLines.tsx), static. */
export const flowLinesSvg = (() => {
  const paths = Array.from({ length: 7 }, (_, i) => {
    const y = 120 + i * 85;
    return `<path d="M-120 ${y}C260 ${y - 140 + i * 12} 640 ${y + 190 - i * 10} 980 ${y + 30}S1420 ${y - 120 + i * 18} 1580 ${y - 40}" fill="none" stroke="#c2d5ff" stroke-width="1.6"/>`;
  }).join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice">${paths}</svg>`;
})();

const circle = (inner: string) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><defs><clipPath id="c"><circle cx="16" cy="16" r="16"/></clipPath>
<radialGradient id="gl" cx="0.32" cy="0.22" r="0.85"><stop offset="0" stop-color="#fff" stop-opacity="0.5"/><stop offset="0.5" stop-color="#fff" stop-opacity="0.05"/><stop offset="1" stop-color="#000" stop-opacity="0.15"/></radialGradient></defs>
<g clip-path="url(#c)">${inner}<circle cx="16" cy="16" r="16" fill="url(#gl)"/></g><circle cx="16" cy="16" r="15.5" fill="none" stroke="#13213a" stroke-opacity="0.12"/></svg>`;

export const flagSvgs = {
  es: circle(
    `<rect width="11" height="32" fill="#006847"/><rect x="11" width="10" height="32" fill="#fff"/><rect x="21" width="11" height="32" fill="#ce1126"/><ellipse cx="16" cy="15.6" rx="2.2" ry="2.6" fill="#8c5a2b"/><path d="M12.6 18.4c1 1.6 2.1 2.3 3.4 2.3s2.4-.7 3.4-2.3" fill="none" stroke="#2e7d32" stroke-width="1"/>`,
  ),
  en: circle(
    `<rect width="32" height="32" fill="#fff"/>${Array.from({ length: 7 }, (_, i) => `<rect y="${(i * 64) / 13}" width="32" height="${32 / 13}" fill="#b22234"/>`).join("")}<rect width="15" height="${(32 / 13) * 7}" fill="#3c3b6e"/>`,
  ),
  pt: circle(
    `<rect width="32" height="32" fill="#009c3b"/><polygon points="2.5,16 16,5.5 29.5,16 16,26.5" fill="#ffdf00"/><circle cx="16" cy="16" r="6.4" fill="#002776"/><path d="M9.8 14.9c3.9-.9 8.3-.3 12.3 2" fill="none" stroke="#fff" stroke-width="1.2"/>`,
  ),
};

export const svgDataUrl = (svg: string) => `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
