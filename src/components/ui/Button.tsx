import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "brand" | "glass" | "ink" | "outline";
type Size = "md" | "lg";

const base =
  "group/btn relative inline-flex items-center justify-center gap-2.5 rounded-full font-bold whitespace-nowrap transition-[transform,background-color,box-shadow,color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.97] disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  brand: "bg-brand-600 text-white shadow-brand hover:-translate-y-0.5 hover:bg-brand-700",
  glass: "glass text-ink hover:-translate-y-0.5 hover:bg-white",
  ink: "bg-ink text-white shadow-lift hover:-translate-y-0.5 hover:bg-brand-700",
  outline: "bg-white text-ink ring-1 ring-line hover:-translate-y-0.5 hover:ring-brand-300 hover:text-brand-700",
};

const sizes: Record<Size, string> = {
  md: "h-12 px-6 text-[15px]",
  lg: "h-14 px-8 text-base",
};

type Common = { variant?: Variant; size?: Size; children: ReactNode; className?: string };

export function ButtonLink({
  variant = "brand",
  size = "md",
  className = "",
  children,
  ...rest
}: Common & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...rest}>
      {children}
    </a>
  );
}

export function Button({
  variant = "brand",
  size = "md",
  className = "",
  children,
  ...rest
}: Common & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...rest}>
      {children}
    </button>
  );
}
