import {
  siAudi,
  siBmw,
  siChevrolet,
  siFacebook,
  siFord,
  siHonda,
  siHyundai,
  siInstagram,
  siJeep,
  siKia,
  siMazda,
  siMg,
  siMitsubishi,
  siNissan,
  siPorsche,
  siRenault,
  siSeat,
  siSuzuki,
  siTiktok,
  siToyota,
  siVolkswagen,
  siWhatsapp,
  siYoutube,
  type SimpleIcon,
} from "simple-icons";

const brands: Record<string, SimpleIcon> = {
  Audi: siAudi,
  BMW: siBmw,
  Chevrolet: siChevrolet,
  Ford: siFord,
  Honda: siHonda,
  Hyundai: siHyundai,
  Jeep: siJeep,
  Kia: siKia,
  Mazda: siMazda,
  MG: siMg,
  Mitsubishi: siMitsubishi,
  Nissan: siNissan,
  Porsche: siPorsche,
  Renault: siRenault,
  SEAT: siSeat,
  Suzuki: siSuzuki,
  Toyota: siToyota,
  Volkswagen: siVolkswagen,
};

const socials = {
  instagram: siInstagram,
  facebook: siFacebook,
  tiktok: siTiktok,
  whatsapp: siWhatsapp,
  youtube: siYoutube,
} as const;

export type Social = keyof typeof socials;

/** Car-maker logo; falls back to a bold wordmark when no SVG is available. */
export function BrandLogo({ name, className = "size-8" }: { name: string; className?: string }) {
  const icon = brands[name];
  if (!icon) {
    return (
      <span className={`grid place-items-center font-display text-sm font-extrabold tracking-tight ${className}`}>
        {name}
      </span>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" role="img" aria-label={name}>
      <path d={icon.path} />
    </svg>
  );
}

export function SocialIcon({ name, className = "size-5" }: { name: Social; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d={socials[name].path} />
    </svg>
  );
}
