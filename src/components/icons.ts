import {
  ArrowUpRight,
  BadgeCheck,
  Building,
  Check,
  Clock,
  Droplets,
  Handshake,
  Mail,
  MapPin,
  Menu,
  PaintBucket,
  Phone,
  ShieldCheck,
  Sparkles,
  SprayCan,
  Users,
  Wrench,
  X,
} from "@lucide/astro";

/** Ikoner som går att välja i src/site.config.ts. Lägg till fler här vid behov. */
export const icons = {
  arrowUpRight: ArrowUpRight,
  badge: BadgeCheck,
  building: Building,
  check: Check,
  clock: Clock,
  drops: Droplets,
  handshake: Handshake,
  mail: Mail,
  pin: MapPin,
  menu: Menu,
  paint: PaintBucket,
  phone: Phone,
  shield: ShieldCheck,
  sparkles: Sparkles,
  spray: SprayCan,
  users: Users,
  wrench: Wrench,
  x: X,
} as const;

export type IconName = keyof typeof icons;
