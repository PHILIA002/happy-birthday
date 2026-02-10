import Header from "@/components/Header";
import Gallery from "@/components/sections/Gallery";
import Server from "@/components/sections/Server";
import Letter from "@/components/sections/Letter";
import MusicPlayer from "@/components/MusicPlayer";
import FadeIn from "@/components/FadeIn";

export default function Home() {
  return (
    <main className="min-h-screen pb-24 md:pb-28">
      <Header />

      <FadeIn>
        <Gallery />
        <Server />
        <Letter />
      </FadeIn>

      <MusicPlayer />
    </main>
  );
}
