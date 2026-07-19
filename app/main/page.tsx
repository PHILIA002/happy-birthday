import AppShell from "@/components/layout/AppShell";
import ChatBoard from "@/components/guestbook/ChatBoard";
import MusicHero from "@/components/music/MusicHero";
import MusicPlaylist from "@/components/music/MusicPlaylist";
import NoticeToast from "@/components/NoticeToast";

export default function MainPage() {
  return (
    <AppShell>
      <NoticeToast />

      <main
        className="
          h-[calc(100dvh-64px)]

          flex
          flex-col

          lg:h-[70vh]
          lg:flex-row
          lg:gap-[2%]
        "
      >
        <section
          className="
            z-10

            h-[40dvh]
            shrink-0

            lg:w-[70%]
            lg:h-auto
            lg:flex-none
          "
        >
          <MusicHero />

          <div className="hidden lg:block mt-5">
            <MusicPlaylist />
          </div>
        </section>

        <aside
          className="
            flex-1
            min-h-0
            overflow-y-auto
            hide-scrollbar
            
            lg:w-[28%]
            lg:h-full
            lg:flex-none

            lg:rounded-2xl
            lg:border
            lg:border-[var(--border)]
            lg:overflow-hidden
          "
        >
          <ChatBoard />
        </aside>
      </main>
    </AppShell>
  );
}