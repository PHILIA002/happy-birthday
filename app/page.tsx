import Gallery from "@/components/sections/Gallery";
import Server from "@/components/sections/Server";
import Player from "@/components/sections/Player";
import Letter from "@/components/sections/Letter";
import FadeIn from "@/components/FadeIn";
import TimelineProgress from "@/components/TimelineProgress";
import BirthdayFireworks from "@/components/BirthdayFireworks";

export default function Home() {
  return (
    <>
    
      <BirthdayFireworks />

      <main className="min-h-screen">
        <FadeIn>
          <TimelineProgress />
          <Gallery />
          <Server />
          <Player />
          <Letter />
        </FadeIn>
      </main>

    </>
  );
}
