import { Calendar, User } from "lucide-react";

export const filters = [
  { value: "all", label: "All cabins" },
  { value: "small", label: "1–3 guests" },
  { value: "medium", label: "4–7 guests" },
  { value: "large", label: "8–12 guests" },
] as const;

export const sideNavigationLinks = [
  {
    name: "Reservations",
    href: "/account/reservations",
    icon: Calendar,
  },
  {
    name: "Guest profile",
    href: "/account/profile",
    icon: User,
  },
] as const;
