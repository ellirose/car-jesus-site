import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Sora } from "next/font/google";
import { Providers } from "./providers";
import es from "@/lib/i18n/es";
import { site } from "@/lib/site";
import "./globals.css";

const body = Plus_Jakarta_Sans({
  variable: "--font-body",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const heading = Sora({
  variable: "--font-heading",
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: es.meta.title,
  description: es.meta.description,
  applicationName: site.name,
  keywords: [
    "autos seminuevos",
    "seminuevos certificados",
    "vender mi auto",
    "financiamiento automotriz",
    "CDMX",
    "used cars Mexico",
    "carros seminovos",
  ],
  alternates: {
    canonical: "/",
    languages: { "es-MX": "/", en: "/?lang=en", "pt-BR": "/?lang=pt" },
  },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: es.meta.title,
    description: es.meta.description,
    locale: "es_MX",
    alternateLocale: ["en_US", "pt_BR"],
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: es.meta.title,
    description: es.meta.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#f7f5f1",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-MX" className={`${body.variable} ${heading.variable} antialiased`}>
      <body className="min-h-full overflow-x-clip">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
