"use client";

export default function Copy() {
  return (
    <footer
      className="
        w-full
        flex items-center justify-center
        py-4 md:py-6
        text-center
        select-none
      "
    >
      <p
        className="
          text-[10px] md:text-xs
          opacity-40 hover:opacity-70
          transition-opacity duration-300
          tracking-wide
        "
      >
        © {new Date().getFullYear()} Niniming Fan Site. <br className="md:hidden"/>
        Made by PHILIA.
      </p>
    </footer>
  );
}
