/**
 * Central business configuration. Replace these placeholder values with the
 * client's real data — every section of the landing page reads from here.
 */
export const site = {
  name: "Solara Autos",
  shortName: "Solara",
  url: "https://solara-autos.mx",
  phone: "+52 55 1234 5678",
  phoneHref: "tel:+525512345678",
  whatsapp: "525512345678",
  email: "hola@solara-autos.mx",
  address: "Av. Insurgentes Sur 1458, Col. Actipan, Benito Juárez, 03230 CDMX",
  mapsUrl: "https://maps.google.com/?q=Av.+Insurgentes+Sur+1458+CDMX",
  socials: {
    instagram: "https://instagram.com/",
    facebook: "https://facebook.com/",
    tiktok: "https://tiktok.com/",
    youtube: "https://youtube.com/",
  },
  copyrightYear: 2026,
} as const;

export function whatsappLink(message: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}
