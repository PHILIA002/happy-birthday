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
        border border-white/40
        bg-white/10
        backdrop-blur-xl
        shadow-[0_10px_30px_rgba(120,90,255,0.25)]
        ${className}
      `}
      {...props}
    >
      {/* inner gradient tint */}
      <div
        className="
        absolute inset-0
        bg-gradient-to-br
        from-purple-200/20
        via-white/5
        to-purple-300/20
        pointer-events-none
      "
      />

      {/* top highlight */}
      <div
        className="
        absolute top-0 left-0 right-0 h-[1px]
        bg-gradient-to-r from-transparent via-white/80 to-transparent
        opacity-80
      "
      />

      {/* subtle inner rim */}
      <div
        className="
        absolute inset-0 rounded-2xl
        ring-1 ring-inset ring-white/30
        pointer-events-none
      "
      />

      {/* content */}
      <div className="relative">{children}</div>
    </div>
  );
}
