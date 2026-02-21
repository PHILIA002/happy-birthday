"use client";

import { useReveal } from "@/hooks/useReveal";
import clsx from "clsx";

export default function RevealCard({
  children,
  index = 0,
  className,
}: {
  children: React.ReactNode;
  index?: number;
  className?: string;
}) {
  const { ref, show } = useReveal();

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${index * 80}ms` }}
      className={clsx(
        `
        transform-gpu
        will-change-transform
        transition-all
        duration-900
        ease-[cubic-bezier(0.22,1,0.36,1)]
        `,
        show
          ? "opacity-100 translate-y-0 scale-100 blur-0"
          : "opacity-0 translate-y-12 scale-[0.96] blur-sm",
        className
      )}
    >
      {children}
    </div>
  );
}