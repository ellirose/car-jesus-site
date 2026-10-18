"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState, type FormEvent } from "react";
import { Clock, Mail, MapPin, Navigation, Phone, Send, PartyPopper } from "lucide";
import type { IconNode } from "lucide";
import { GlassIcon, type Tone } from "../icons/GlassIcon";
import { Glyph } from "../icons/Glyph";
import { Button } from "../ui/Button";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { useI18n } from "@/lib/i18n/provider";
import { site, whatsappLink } from "@/lib/site";

function MapArt() {
  return (
    <svg viewBox="0 0 600 260" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full" aria-hidden>
      <rect width="600" height="260" fill="#eef0ea" />
      <path d="M420 0c-30 60 10 110 80 120s100 60 100 60V0Z" fill="#cfe3ff" />
      <ellipse cx="110" cy="200" rx="90" ry="50" fill="#d6eed9" />
      <ellipse cx="300" cy="40" rx="60" ry="30" fill="#d6eed9" />
      <g stroke="#fff" strokeLinecap="round" fill="none">
        <path d="M-10 150C120 140 200 120 300 130s200 40 320 20" strokeWidth="18" />
        <path d="M230 -10c10 80 20 170 0 280" strokeWidth="14" />
        <path d="M-10 60h620" strokeWidth="8" />
        <path d="M80 -10v280M470 -10c-10 90 10 180-10 280M360 -10v280" strokeWidth="7" />
        <path d="M-10 220h620" strokeWidth="6" />
      </g>
      <path d="M-10 150C120 140 200 120 300 130s200 40 320 20" stroke="#ffc070" strokeWidth="2" strokeDasharray="10 10" fill="none" />
    </svg>
  );
}

const cardShapes = [
  "rounded-[2rem_2rem_2rem_0.75rem]",
  "rounded-[2rem_2rem_0.75rem_2rem]",
  "rounded-[0.75rem_2rem_2rem_2rem]",
  "rounded-[2rem_0.75rem_2rem_2rem]",
];

export function Contact() {
  const { t } = useI18n();
  const f = t.contact.form;
  const [interest, setInterest] = useState(0);
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");

  const cards: { icon: IconNode; tone: Tone; title: string; lines: string[]; href?: string }[] = [
    { icon: MapPin, tone: "sun", title: t.contact.visit, lines: [site.address], href: site.mapsUrl },
    { icon: Phone, tone: "azure", title: t.contact.call, lines: [site.phone], href: site.phoneHref },
    { icon: Mail, tone: "mint", title: t.contact.write, lines: [site.email], href: `mailto:${site.email}` },
    { icon: Clock, tone: "berry", title: t.contact.hours, lines: t.contact.hoursLines },
  ];

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const message = [
      `${f.interest}: ${f.interests[interest]}`,
      `${f.name}: ${data.get("name")}`,
      `${f.phone}: ${data.get("phone")}`,
      `${f.email}: ${data.get("email")}`,
      String(data.get("message") || ""),
    ]
      .filter(Boolean)
      .join("\n");
    // No backend yet: hand the lead off to WhatsApp, the dealership's main channel.
    // Opened synchronously so popup blockers treat it as user-initiated.
    window.open(whatsappLink(message), "_blank", "noopener");
    setStatus("sending");
    window.setTimeout(() => {
      form.reset();
      setStatus("done");
    }, 600);
  }

  const inputCls =
    "w-full rounded-2xl bg-canvas px-5 py-4 text-[15px] font-semibold text-ink ring-1 ring-line transition outline-none placeholder:font-medium placeholder:text-ink-mute focus:bg-white focus:ring-2 focus:ring-sun-400";

  return (
    <section id="contacto" className="relative isolate overflow-hidden py-20 lg:py-32">
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-canvas via-sun-50/60 to-sand" />
      <div className="container-x grid gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
        <div>
          <SectionHeading align="left" eyebrow={t.contact.eyebrow} title={t.contact.title} subtitle={t.contact.subtitle} />

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {cards.map((c, i) => {
              const inner = (
                <>
                  <GlassIcon icon={c.icon} tone={c.tone} delay={i * 0.1} className="size-16 shrink-0" />
                  <div className="min-w-0">
                    <p className="font-display font-bold text-ink">{c.title}</p>
                    {c.lines.map((l) => (
                      <p key={l} className="text-sm leading-relaxed text-ink-soft">
                        {l}
                      </p>
                    ))}
                  </div>
                </>
              );
              const cls = `group flex h-full items-start gap-4 bg-white/85 p-5 shadow-soft ring-1 ring-white backdrop-blur transition duration-500 hover:-translate-y-1.5 hover:bg-white hover:shadow-lift ${cardShapes[i]}`;
              return (
                <Reveal key={c.title} delay={i * 0.07} y={20}>
                  {c.href ? (
                    <a href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className={cls}>
                      {inner}
                    </a>
                  ) : (
                    <div className={cls}>{inner}</div>
                  )}
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={0.2} className="mt-4">
            <a
              href={site.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="group relative block h-56 overflow-hidden rounded-[2.5rem] shadow-soft ring-1 ring-white transition duration-500 hover:shadow-lift"
            >
              <MapArt />
              <span className="absolute top-1/2 left-[38%] -translate-x-1/2 -translate-y-full">
                <span className="absolute top-full left-1/2 size-10 -translate-x-1/2 -translate-y-1/2 animate-pulse-ring rounded-full bg-sun-400/50" />
                <span className="relative grid size-14 place-items-center rounded-full rounded-br-none bg-gradient-sun text-white shadow-sun transition group-hover:-translate-y-1 [transform:rotate(45deg)]">
                  <Glyph icon={MapPin} size={24} strokeWidth={2.4} className="-rotate-45" />
                </span>
              </span>
              <span className="glass absolute right-4 bottom-4 flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold text-ink transition group-hover:bg-white">
                <Glyph icon={Navigation} size={16} strokeWidth={2.4} className="text-sun-600" />
                {t.contact.map}
              </span>
            </a>
          </Reveal>
        </div>

        {/* form */}
        <Reveal y={50} className="relative pt-12">
          <div className="absolute top-0 left-8 flex h-14 items-center gap-2.5 rounded-t-[1.5rem] bg-white px-6 font-display text-lg font-bold text-ink">
            <span className="grid size-7 place-items-center rounded-full bg-gradient-sun text-white">
              <Glyph icon={Send} size={14} strokeWidth={2.6} />
            </span>
            {f.title}
          </div>
          <div className="relative rounded-[2.5rem] rounded-tl-[1rem] bg-white p-6 shadow-lift sm:p-10">
            <AnimatePresence mode="wait">
              {status === "done" ? (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex min-h-[28rem] flex-col items-center justify-center text-center"
                >
                  <GlassIcon icon={PartyPopper} tone="mint" className="size-32" />
                  <p className="mt-6 max-w-sm font-display text-2xl font-bold text-ink">{f.success}</p>
                  <button onClick={() => setStatus("idle")} className="mt-6 text-sm font-bold text-sun-700 underline-offset-4 hover:underline">
                    ← {f.title}
                  </button>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={onSubmit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-5">
                  <fieldset>
                    <legend className="mb-3 text-sm font-bold text-ink-soft">{f.interest}</legend>
                    <div className="flex flex-wrap gap-2">
                      {f.interests.map((label, i) => (
                        <button
                          key={label}
                          type="button"
                          aria-pressed={interest === i}
                          onClick={() => setInterest(i)}
                          className={`rounded-full px-4 py-2.5 text-sm font-bold transition ${
                            interest === i
                              ? "bg-ink text-white shadow-soft"
                              : "bg-canvas text-ink-soft ring-1 ring-line hover:text-ink hover:ring-ink/20"
                          }`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </fieldset>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="sm:col-span-2">
                      <span className="sr-only">{f.name}</span>
                      <input name="name" required autoComplete="name" placeholder={f.name} className={inputCls} />
                    </label>
                    <label>
                      <span className="sr-only">{f.phone}</span>
                      <input name="phone" required type="tel" autoComplete="tel" placeholder={f.phone} className={inputCls} />
                    </label>
                    <label>
                      <span className="sr-only">{f.email}</span>
                      <input name="email" type="email" autoComplete="email" placeholder={f.email} className={inputCls} />
                    </label>
                    <label className="sm:col-span-2">
                      <span className="sr-only">{f.message}</span>
                      <textarea name="message" rows={4} placeholder={f.message} className={`${inputCls} resize-none`} />
                    </label>
                  </div>
                  <Button type="submit" size="lg" className="w-full" disabled={status === "sending"}>
                    {status === "sending" ? f.sending : f.submit}
                    <Glyph icon={Send} size={18} strokeWidth={2.4} className="transition group-hover/btn:translate-x-1 group-hover/btn:-translate-y-0.5" />
                  </Button>
                  <p className="text-center text-xs text-ink-mute">{f.privacy}</p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
