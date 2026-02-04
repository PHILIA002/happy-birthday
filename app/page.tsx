import Header from "@/components/Header";
import Gallery from "@/components/sections/Gallery";
import Quote from "@/components/sections/Quote";
import Server from "@/components/sections/Server";
import Keyword from "@/components/sections/Keyword";
import Letter from "@/components/sections/Letter";
import MusicPlayer from "@/components/MusicPlayer";
import PageFadeIn from "@/components/PageFadeIn";

export default function Home() {
  return (
    <main className="min-h-screen pb-24 md:pb-28">
      <Header />

      <PageFadeIn>
        <Gallery />
        <Quote />
        <Keyword />
        <Letter />
        <Server />
      </PageFadeIn>

      <MusicPlayer />
    </main>
  );
}
