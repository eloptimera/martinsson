import { ArrowRight, Check, Clock, Mail, MapPin, Menu, Phone, X } from "@lucide/astro";

/** Få, funktionella ikoner. Lägg till fler här vid behov. */
export const icons = {
  arrow: ArrowRight,
  check: Check,
  clock: Clock,
  mail: Mail,
  pin: MapPin,
  menu: Menu,
  phone: Phone,
  x: X,
} as const;

export type IconName = keyof typeof icons;
