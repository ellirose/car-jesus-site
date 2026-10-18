import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "sun" | "glass" | "ink" | "outline";
type Size = "md" | "lg";

const base =
  "group/btn relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full font-bold whitespace-nowrap transition-all duration-300 active:scale-[0.97] disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  sun: "bg-gradient-sun text-white shadow-sun hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-10px_rgb(255_122_26/0.7)]",
  glass: "glass text-ink hover:-translate-y-0.5 hover:bg-white",
  ink: "bg-ink text-white shadow-lift hover:-translate-y-0.5 hover:bg-[#1d2f50]",
  outline: "bg-white/60 text-ink ring-1 ring-ink/10 backdrop-blur hover:-translate-y-0.5 hover:bg-white hover:ring-ink/20",
};

const sizes: Record<Size, string> = {
  md: "h-12 px-6 text-[15px]",
  lg: "h-14 px-8 text-base",
};

function Shine() {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/45 to-transparent animate-shimmer"
    />
  );
}

type Common = { variant?: Variant; size?: Size; children: ReactNode; className?: string };

export function ButtonLink({
  variant = "sun",
  size = "md",
  className = "",
  children,
  ...rest
}: Common & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...rest}>
      {variant === "sun" && <Shine />}
      {children}
    </a>
  );
}

export function Button({
  variant = "sun",
  size = "md",
  className = "",
  children,
  ...rest
}: Common & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...rest}>
      {variant === "sun" && <Shine />}
      {children}
    </button>
  );
}
