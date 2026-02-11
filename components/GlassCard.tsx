import React from "react";

type GlassCardProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
};

export default function GlassCard({
  children,
  className = "",
  ...props
}: GlassCardProps) {
  return (
    <div
      className={`
        relative overflow-hidden
        rounded-2xl
        border border-white/25
        bg-white/10
        backdrop-blur-xl
        shadow-[0_10px_30px_rgba(120,90,255,0.18)]
        ${className}
      `}
      {...props}
    >
      {/* top highlight만 유지 */}
      <div
        className="
        absolute top-0 left-0 right-0 h-[1px]
        bg-gradient-to-r from-transparent via-white/60 to-transparent
        opacity-60
      "
      />

      <div className="relative">{children}</div>
    </div>
  );
}
