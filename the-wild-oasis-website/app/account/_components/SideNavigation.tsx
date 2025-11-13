"use client";

import { sideNavigationLinks } from "@/lib/constant";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SignOutButton from "./SignOutButton";

const SideNavigation = () => {
  const pathname = usePathname();

  return (
    <nav className="border-primary-900 h-full border-r">
      <ul className="flex h-full flex-col gap-2 text-lg">
        {sideNavigationLinks.map((link) => (
          <li key={link.name}>
            <Link
              className={`${pathname === link.href ? "bg-primary-900" : ""} hover:bg-primary-900 hover:text-primary-100 text-primary-200 flex items-center gap-4 px-5 py-3 font-semibold transition-colors`}
              href={link.href}
            >
              <link.icon className="text-primary-600 h-5 w-5" />
              <span>{link.name}</span>
            </Link>
          </li>
        ))}

        <li className="mt-auto">
          <SignOutButton />
        </li>
      </ul>
    </nav>
  );
};

export default SideNavigation;
