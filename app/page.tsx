import Header from "@/components/Header";
import Gallery from "@/components/sections/Gallery";
import Server from "@/components/sections/Server";
import Letter from "@/components/sections/Letter";
import MusicPlayer from "@/components/MusicPlayer";
import PageFadeIn from "@/components/PageFadeIn";

export default function Home() {
  return (
    <main className="min-h-screen pb-24 md:pb-28">
      <Header />

      <PageFadeIn>
        <Gallery />
        <Server />
        <Letter />
      </PageFadeIn>

      <MusicPlayer />
    </main>
  );
}
