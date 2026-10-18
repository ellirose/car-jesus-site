"use client";

import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, BadgeCheck, Pause, Play, ShieldCheck, Star } from "lucide";
import { Glyph } from "../icons/Glyph";
import { GlassIcon } from "../icons/GlassIcon";
import { ButtonLink } from "../ui/Button";
import { RotatingBadge } from "../ui/RotatingBadge";
import { HeroSearch } from "./HeroSearch";
import { useI18n } from "@/lib/i18n/provider";

const ease = [0.16, 1, 0.3, 1] as const;

function CreditRing({ value }: { value: number }) {
  const r = 22;
  const c = 2 * Math.PI * r;
  return (
    <svg viewBox="0 0 56 56" className="size-14 -rotate-90">
      <circle cx="28" cy="28" r={r} fill="none" stroke="#dbe7ff" strokeWidth="6" />
      <motion.circle
        cx="28"
        cy="28"
        r={r}
        fill="none"
        stroke="url(#credit-grad)"
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray={c}
        initial={{ strokeDashoffset: c }}
        animate={{ strokeDashoffset: c * (1 - value / 100) }}
        transition={{ duration: 1.8, delay: 1, ease }}
      />
      <defs>
        <linearGradient id="credit-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8db2ff" />
          <stop offset="1" stopColor="#2c60e0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

const avatarColors = ["bg-sun-400", "bg-azure-500", "bg-mint-500", "bg-berry-400"];

export function Hero() {
  const { t } = useI18n();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      videoRef.current?.pause();
      // eslint-disable-next-line react-hooks/set-state-in-effect -- reflect the paused video
      setPlaying(false);
    }
  }, []);

  function toggleVideo() {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      void v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  }

  return (
    <section id="inicio" className="relative isolate flex h-svh min-h-[600px] flex-col overflow-hidden pt-20 lg:min-h-[680px] lg:pt-[8.5rem]">
      {/* ambient background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 -left-40 size-[38rem] rounded-full bg-sun-200/60 blur-[120px]" />
        <div className="absolute top-1/3 -right-40 size-[34rem] rounded-full bg-azure-100/80 blur-[120px]" />
        <div className="absolute inset-0 bg-dots opacity-50 [mask-image:radial-gradient(ellipse_at_30%_40%,#000,transparent_70%)]" />
      </div>

      <div className="container-x relative flex min-h-0 flex-1 flex-col gap-4 pb-4 sm:gap-5 lg:grid lg:grid-cols-12 lg:grid-rows-[minmax(0,1fr)_auto] lg:gap-x-10 lg:gap-y-0 lg:pb-6 xl:gap-x-14">
        {/* ── Copy ── */}
        <div className="order-2 lg:order-none lg:col-span-6 lg:row-start-1 lg:self-center lg:pb-16 xl:col-span-5 2xl:col-span-6">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="glass inline-flex items-center gap-2.5 rounded-full py-1.5 pr-4 pl-2 text-[13px] font-bold text-ink-soft tiny:hidden"
          >
            <span className="relative grid size-6 place-items-center rounded-full bg-mint-500/15">
              <span className="absolute inset-0 animate-pulse-ring rounded-full bg-mint-400/60" />
              <span className="size-2 rounded-full bg-mint-500" />
            </span>
            {t.hero.eyebrow}
          </motion.span>

          <h1 className="mt-3 font-display text-[clamp(2rem,min(4.6vw,6.6vh),4.1rem)] leading-[1.04] font-bold tracking-[-0.03em] text-balance text-ink sm:mt-5 lg:mt-6">
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease }}
            >
              {t.hero.titleA}
            </motion.span>
            <motion.span
              className="mt-1 block leading-[1.2]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.22, ease }}
            >
              {/* underline follows each wrapped line (box-decoration-clone) and draws in */}
              <motion.span
                className="bg-[linear-gradient(90deg,#ffc24b,#f26b12)] box-decoration-clone bg-bottom-left bg-no-repeat pb-1"
                initial={{ backgroundSize: "0% 5px" }}
                animate={{ backgroundSize: "100% 5px" }}
                transition={{ duration: 1.2, delay: 0.8, ease }}
              >
                <span className="text-gradient-sun box-decoration-clone">{t.hero.titleB}</span>
              </motion.span>
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease }}
            className="mt-4 max-w-xl text-base leading-relaxed text-pretty text-ink-soft sm:text-lg lg:mt-6 tiny:hidden"
          >
            {t.hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease }}
            className="mt-5 flex flex-wrap gap-3 lg:mt-8"
          >
            <ButtonLink href="#inventario" size="lg" className="max-sm:h-12 max-sm:flex-1 max-sm:px-5">
              {t.hero.ctaPrimary}
              <Glyph icon={ArrowRight} size={20} strokeWidth={2.4} className="transition group-hover/btn:translate-x-1" />
            </ButtonLink>
            <ButtonLink href="#vender" variant="glass" size="lg" className="max-sm:h-12 max-sm:flex-1 max-sm:px-5">
              {t.hero.ctaSecondary}
            </ButtonLink>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-8 hidden items-center gap-4 lg:flex short:hidden"
          >
            <div className="flex -space-x-2">
              {["ML", "JR", "DO", "FC"].map((n, i) => (
                <span
                  key={n}
                  className={`grid size-11 place-items-center rounded-full text-xs font-bold text-white ring-4 ring-canvas ${avatarColors[i]}`}
                >
                  {n}
                </span>
              ))}
            </div>
            <div>
              <div className="flex items-center gap-1 text-sun-500">
                {Array.from({ length: 5 }, (_, i) => (
                  <svg key={i} viewBox="0 0 24 24" className="size-4 fill-current">
                    <path d={Star[0][1].d as string} />
                  </svg>
                ))}
                <span className="ml-1.5 text-sm font-bold text-ink">{t.hero.rating}</span>
              </div>
              <p className="text-sm font-medium text-ink-soft">{t.hero.trust}</p>
            </div>
          </motion.div>
        </div>

        {/* ── Video stage ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.1, ease }}
          className="relative order-1 min-h-0 flex-1 lg:order-none lg:col-span-6 lg:row-start-1 xl:col-span-7 2xl:col-span-6"
        >
          <div className="absolute inset-0 overflow-hidden rounded-[2rem] rounded-tl-[5rem] shadow-lift ring-1 ring-white/60 lg:rounded-[2.75rem] lg:rounded-tl-[9rem]">
            <video
              ref={videoRef}
              className="size-full object-cover"
              src="/media/videos/hero.mp4"
              poster="/media/images/road.jpg"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-sun-500/15 via-transparent to-white/20" />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/25 to-transparent" />
          </div>

          <button
            type="button"
            onClick={toggleVideo}
            aria-label={playing ? t.hero.pause : t.hero.play}
            className="glass absolute bottom-4 left-4 grid size-12 place-items-center rounded-full text-ink transition hover:scale-110 lg:bottom-24 lg:left-8 lg:size-14"
          >
            <Glyph icon={playing ? Pause : Play} size={20} strokeWidth={2.4} />
          </button>

          <RotatingBadge text={t.hero.ring} className="absolute top-3 right-3 size-24 lg:top-6 lg:right-6 lg:size-32">
            <Glyph icon={BadgeCheck} size="55%" strokeWidth={2.2} />
          </RotatingBadge>

          {/* floating warranty card */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.7, ease }}
            className="absolute top-[16%] -left-10 hidden xl:block"
          >
            <div
              className="group glass flex animate-float items-center gap-4 rounded-[1.75rem] rounded-bl-md py-3 pr-6 pl-3 shadow-lift [--float-rotate:-2deg]"
              style={{ transform: "perspective(800px) rotateY(12deg)" }}
            >
              <GlassIcon icon={ShieldCheck} tone="mint" className="size-16" />
              <div>
                <p className="font-display text-lg font-bold text-ink">{t.hero.warrantyTitle}</p>
                <p className="text-sm text-ink-soft">{t.hero.warrantyText}</p>
              </div>
            </div>
          </motion.div>

          {/* floating credit card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.9, ease }}
            className="absolute right-6 bottom-28 hidden lg:block short:bottom-24"
          >
            <div className="glass flex animate-float-slow items-center gap-4 rounded-[1.75rem] rounded-br-md py-3 pr-6 pl-3 shadow-lift [--float-rotate:2deg]">
              <div className="relative grid place-items-center">
                <CreditRing value={92} />
                <span className="absolute font-display text-xs font-extrabold text-azure-600">92%</span>
              </div>
              <div>
                <p className="font-display text-lg font-bold text-ink">{t.hero.creditTitle}</p>
                <p className="text-sm text-ink-soft">{t.hero.creditText}</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* ── Search ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease }}
          className="relative z-20 order-3 lg:order-none lg:col-span-12 lg:row-start-2 lg:-mt-16 lg:pl-[4%] xl:pl-[8%]"
        >
          <HeroSearch />
        </motion.div>
      </div>
    </section>
  );
}
