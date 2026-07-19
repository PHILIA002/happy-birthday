"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Image as ImageIcon,
  Mail,
} from "lucide-react";

function NavItem({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: any;
  label: string;
}) {
  const pathname = usePathname();

  const active = pathname === href;

  return (
    <Link
      href={href}
      className={`
        flex
        items-center
        gap-2

        px-2
        py-1

        rounded-lg

        ${
          active
            ? "bg-[var(--primary)]/12 text-[var(--primary)]"
            : "text-[var(--text-sub)] hover:text-[var(--primary)]"
        }
      `}
    >
      <Icon className="w-4 h-4 lg:w-5 lg:h-5" />

      <span
        className={`
          text-sm
          font-medium

          ${active ? "inline" : "hidden"}
          lg:inline
        `}
      >
        {label}
      </span>
    </Link>
  );
}

export default function Links() {
  const today = new Date();

  const showLetter =
    today.getMonth() === 3 &&
    today.getDate() === 19;

  return (
    <nav className="flex items-center gap-1 p-1 rounded-lg bg-[var(--surface-soft)]/70">
      <NavItem
        href="/main"
        icon={Home}
        label="홈"
      />

      <NavItem
        href="/gallery"
        icon={ImageIcon}
        label="팬아트"
      />

      {showLetter && (
        <NavItem
          href="/letter"
          icon={Mail}
          label="편지"
        />
      )}
    </nav>
  );
}