"use client";

import { ArrowUp, Mail, MapPin, Phone } from "lucide";
import { Glyph } from "./icons/Glyph";
import { SocialIcon, type Social } from "./icons/BrandLogo";
import { Logo } from "./Header";
import { LanguageToggle } from "./LanguageToggle";
import { useI18n } from "@/lib/i18n/provider";
import { site, whatsappLink } from "@/lib/site";

const navIds = [
  ["inicio", "home"],
  ["inventario", "inventory"],
  ["vender", "sell"],
  ["financiamiento", "financing"],
  ["nosotros", "about"],
  ["contacto", "contact"],
] as const;

const socialList: Social[] = ["instagram", "facebook", "tiktok", "youtube"];

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="relative isolate overflow-hidden bg-sand pt-20">
      <div aria-hidden className="absolute -top-32 left-1/2 -z-10 h-64 w-[80%] -translate-x-1/2 rounded-full bg-sun-200/50 blur-[100px]" />

      <div className="container-x">
        {/* CTA strip */}
        <div className="flex flex-col items-center justify-between gap-6 rounded-full bg-white/80 p-3 shadow-soft ring-1 ring-white backdrop-blur max-md:rounded-[2rem] max-md:p-6 md:flex-row md:pl-8">
          <p className="font-display text-xl font-bold text-ink max-md:text-center">{t.footer.newsletter}</p>
          <a
            href={whatsappLink(t.fabMessage)}
            target="_blank"
            rel="noreferrer"
            className="flex h-14 items-center gap-3 rounded-full bg-[#25d366] px-7 font-bold text-white shadow-[0_12px_28px_-10px_#25d366] transition hover:-translate-y-0.5"
          >
            <SocialIcon name="whatsapp" className="size-6" />
            {t.footer.subscribe}
          </a>
        </div>

        <div className="mt-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-xs leading-relaxed text-ink-soft">{t.footer.tagline}</p>
            <div className="mt-6 flex gap-3">
              {socialList.map((s) => (
                <a
                  key={s}
                  href={site.socials[s as keyof typeof site.socials]}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s}
                  className="grid size-12 place-items-center rounded-full bg-white text-ink-soft shadow-soft transition duration-300 hover:-translate-y-1 hover:bg-gradient-sun hover:text-white hover:shadow-sun"
                >
                  <SocialIcon name={s} className="size-5" />
                </a>
              ))}
            </div>
          </div>

          <nav aria-label={t.footer.explore}>
            <p className="font-display text-lg font-bold text-ink">{t.footer.explore}</p>
            <ul className="mt-5 space-y-3">
              {navIds.map(([id, key]) => (
                <li key={id}>
                  <a href={`#${id}`} className="font-semibold text-ink-soft transition hover:pl-1 hover:text-sun-600">
                    {t.nav[key]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="font-display text-lg font-bold text-ink">{t.footer.services}</p>
            <ul className="mt-5 space-y-3">
              {t.footer.serviceLinks.map((s) => (
                <li key={s}>
                  <a href="#servicios" className="font-semibold text-ink-soft transition hover:pl-1 hover:text-sun-600">
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-display text-lg font-bold text-ink">{t.footer.contact}</p>
            <ul className="mt-5 space-y-4 text-ink-soft">
              <li>
                <a href={site.phoneHref} className="flex items-center gap-3 font-semibold transition hover:text-sun-600">
                  <Glyph icon={Phone} size={18} className="shrink-0 text-sun-600" />
                  {site.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="flex items-center gap-3 font-semibold transition hover:text-sun-600">
                  <Glyph icon={Mail} size={18} className="shrink-0 text-sun-600" />
                  {site.email}
                </a>
              </li>
              <li className="flex gap-3">
                <Glyph icon={MapPin} size={18} className="mt-0.5 shrink-0 text-sun-600" />
                <span className="text-sm leading-relaxed">{site.address}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-ink/10 py-8 lg:flex-row">
          <p className="text-sm text-ink-mute">
            © {site.copyrightYear} {site.name}. {t.footer.rights}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm font-semibold text-ink-soft">
            <a href="#" className="hover:text-ink">
              {t.footer.privacy}
            </a>
            <a href="#" className="hover:text-ink">
              {t.footer.terms}
            </a>
            <LanguageToggle layoutKey="lang-footer" />
            <a
              href="#inicio"
              aria-label={t.footer.backToTop}
              title={t.footer.backToTop}
              className="grid size-12 place-items-center rounded-full bg-ink text-white transition hover:-translate-y-1 hover:bg-sun-600"
            >
              <Glyph icon={ArrowUp} size={20} strokeWidth={2.4} />
            </a>
          </div>
        </div>
      </div>

      {/* oversized wordmark */}
      <p
        aria-hidden
        className="pointer-events-none -mb-[0.22em] text-center font-display text-[clamp(5rem,22vw,20rem)] leading-none font-extrabold tracking-[-0.06em] select-none"
        style={{
          background: "linear-gradient(180deg, rgb(255 138 31 / 0.22), rgb(255 138 31 / 0))",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
        }}
      >
        Solara
      </p>
    </footer>
  );
}
