"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookMarked, Image as ImageIcon } from "lucide-react";

function NavItem({
  href,
  icon: Icon,
}: {
  href: string;
  icon: any;
}) {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Link href={href} className="group relative">
      {/* Glow */}
      <div
        className={`
          absolute inset-0 rounded-2xl
          blur-xl transition-all duration-300

          ${
            active
              ? "opacity-100 bg-[var(--primary)]/25"
              : "opacity-0 group-hover:opacity-100 bg-[var(--primary)]/15"
          }
        `}
      />

      {/* Button */}
      <div
        className={`
          relative
          w-10 h-10 md:w-11 md:h-11
          flex items-center justify-center
          rounded-2xl

          border
          backdrop-blur-md

          transition-all duration-300

          ${
            active
              ? `
                bg-[var(--primary)]/15
                border-[var(--primary)]/30
                text-white
                shadow-[0_0_20px_var(--primary)]
              `
              : `
                bg-[var(--bg-sub)]/40
                border-[var(--glass-border)]
                text-[var(--primary-soft)]

                hover:bg-[var(--bg-sub)]/70
                hover:border-[var(--primary)]/20
                hover:text-[var(--text-main)]
              `
          }

          group-hover:-translate-y-[1px]
        `}
      >
        <div className="w-5 h-5 flex items-center justify-center">
          <Icon className="w-full h-full" strokeWidth={2.2} />
        </div>
      </div>
    </Link>
  );
}

export default function Links() {
  return (
    <nav className="flex items-center gap-2">
      <NavItem href="/main" icon={Home} />
      <NavItem href="/gallery" icon={ImageIcon} />
      <NavItem href="/guestbook" icon={BookMarked} />
    </nav>
  );
}