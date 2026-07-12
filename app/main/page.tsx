import AppShell from "@/components/layout/AppShell";
import ChatBoard from "@/components/guestbook/ChatBoard";
import MusicHero from "@/components/music/MusicHero";
import MusicPlaylist from "@/components/music/MusicPlaylist";

export default function MainPage() {
  return (
    <AppShell>
      <main
        className="
          h-auto

          flex
          flex-col

          lg:h-[70vh]
          lg:flex-row
          lg:gap-[2%]
        "
      >
        <section
          className="
            w-full

            lg:flex-1
            lg:min-w-0
          "
        >
          <MusicHero />

          <div className="hidden lg:block mt-5">
            <MusicPlaylist />
          </div>
        </section>

        <aside
          className="
            w-full

            lg:w-[28%]
            lg:h-full
            lg:flex-shrink-0

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