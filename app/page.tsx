import Gallery from "@/components/sections/Gallery";
import Server from "@/components/sections/Server";
import Letter from "@/components/sections/Letter";
import FadeIn from "@/components/FadeIn";

export default function Home() {
  return (
    <main className="min-h-screen pb-24 md:pb-28">

      <FadeIn>
        <Gallery />
        <Server />
        <Letter />
      </FadeIn>

    </main>
  );
}
