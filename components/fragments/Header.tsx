import Countdown from "./Countdown";
import Links from "./Links";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header
      className="
        fixed top-0 left-0 right-0 z-50

        h-16 md:h-[72px]

        flex items-center justify-between

        px-4 md:px-8

        bg-[var(--bg-main)]

        border-b border-[var(--glass-border)]
      "
    >
      {/* LEFT */}
      <div
        className="
          text-[var(--primary)]
        "
      >
        <Countdown />
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-5">
        {/* nav */}
        <div
          className="
            flex items-center gap-1
          "
        >
          <Links />
        </div>

        {/* divider */}
        <div
          className="
            h-5 w-px
            bg-[var(--primary)]/20
          "
        />

        {/* theme */}
        <div
          className="
            text-[var(--primary-soft)]

            hover:text-[var(--primary)]

            transition-colors duration-200
          "
        >
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}