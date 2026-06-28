"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Home,
  Image as ImageIcon,
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

        gap-0
        lg:gap-2

        px-3
        py-2

        rounded-lg

        text-sm
        font-medium

        transition

        ${
          active
            ? "text-[var(--primary)]"
            : "text-[var(--text-sub)] hover:text-[var(--primary)]"
        }
      `}
    >
      <Icon className="w-5 h-5 lg:w-6 lg:h-6" />

      <span className="hidden lg:inline">
        {label}
      </span>
    </Link>
  );
}

export default function Links() {
  return (
    <nav className="flex items-center">
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
    </nav>
  );
}