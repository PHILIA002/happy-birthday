import Gallery from "@/components/sections/Gallery";
import Server from "@/components/sections/Server";
import Letter from "@/components/sections/Letter";
import FadeIn from "@/components/FadeIn";
import TimelineProgress from "@/components/TimelineProgress";

export default function Home() {
  return (
    <main className="min-h-screen">
      <FadeIn>
        <TimelineProgress />
        <Gallery />
        <Server />
        <Letter />
      </FadeIn>
    </main>
  );
}
