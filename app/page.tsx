import Gallery from "@/components/sections/Gallery";
import Player from "@/components/sections/Player";
import Server from "@/components/sections/Server";
import Letter from "@/components/sections/Letter";
import FadeIn from "@/components/FadeIn";
import TimelineProgress from "@/components/TimelineProgress";
import BirthdayFireworks from "@/components/BirthdayFireworks";
import NoticeToast from "@/components/NoticeToast";

export default function Home() {
  return (
    <>
    
      <BirthdayFireworks />

      <main className="min-h-screen">
        <FadeIn>
          <TimelineProgress />
          <NoticeToast message="방명록 섭종" />
          <Gallery />
          <Server />
          <Letter />
        </FadeIn>
      </main>

    </>
  );
}
