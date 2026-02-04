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
              hover:scale-105 transition-transform
            "
          >
            <div className="flex items-center gap-1.5 whitespace-nowrap">
              <Hash
                className={`w-3.5 h-3.5 md:w-4 md:h-4
                  ${tag.highlight ? "text-nini-accent" : "text-nini-subtext"}
                `}
              />
              <span
                className={`text-xs md:text-sm font-semibold tracking-wide
                  ${tag.highlight ? "text-nini-accent" : "text-nini-text"}
                `}
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
