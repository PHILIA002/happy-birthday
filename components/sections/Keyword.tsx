import { TAGS } from "@/data/tags";
import GlassCard from "../GlassCard";
import { Hash } from "lucide-react";

export default function Keyword() {
  return (
    <section className="py-24 md:py-32 px-5">
      <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-2 md:gap-3">
        {TAGS.map((tag) => (
          <GlassCard
            key={tag.text}
            className="
              px-3.5 py-1.5 md:px-5 md:py-2
              rounded-full
              transition-all duration-300
              hover:scale-105
              hover:bg-white/10
              hover:shadow-[0_0_22px_rgba(139,92,246,0.25)]
            "
          >
            <div className="flex items-center gap-1.5 whitespace-nowrap">
              <Hash
                className="w-3.5 h-3.5 md:w-4 md:h-4"
                style={{
                  color: tag.highlight ? "#8B6FE8" : "#7C66B4",
                }}
              />

              <span
                className="text-xs md:text-sm font-semibold tracking-wide"
                style={{
                  color: tag.highlight ? "#8B6FE8" : "#6E5A8A",
                }}
              >
                {tag.text}
              </span>
            </div>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}
