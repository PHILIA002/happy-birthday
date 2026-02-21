"use client";

import { usePathname } from "next/navigation";

import Header from "@/components/Header";
import Copy from "@/components/Copy";
import PlayerShell from "@/components/PlayerShell";
import { MusicPlayerProvider } from "@/components/MusicPlayerProvider";

export default function ClientShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const showPlayer = !pathname.startsWith("/guestbook");

  return (
    <MusicPlayerProvider>
      <Header />

      <main className={`flex-1 ${showPlayer ? "pb-28 md:pb-32" : ""}`}>
        {children}
      </main>

      <PlayerShell />
      <Copy />
    </MusicPlayerProvider>
  );
}