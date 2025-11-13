"use client";

import { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type ActiveLinkProps = {
  href: string;
  children: React.ReactNode;
  session?: Session | null;
  isUserArea?: boolean;
};

const ActiveLink = ({
  href,
  children,
  session,
  isUserArea,
}: ActiveLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  if (isUserArea && session?.user?.image) {
    return (
      <Link
        href={href}
        className={`hover:text-accent-400 flex items-center gap-4 transition-colors ${
          isActive ? "text-accent-400" : ""
        }`}
      >
        <span>{children}</span>
        <Image
          src={session.user.image}
          alt={session.user.name || "User Logo"}
          className="size-8 rounded-full"
          width={20}
          height={20}
        />
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className={`hover:text-accent-400 transition-colors ${
        isActive ? "text-accent-400" : ""
      }`}
    >
      {children}
    </Link>
  );
};

export default ActiveLink;
