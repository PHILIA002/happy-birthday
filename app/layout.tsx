"use client";

import "./globals.css";

import { usePathname } from "next/navigation";

import Header from "@/components/layout/Header";
import { MusicPlayerProvider } from "@/components/music/MusicPlayerProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const showHeader = pathname !== "/";

  return (
    <html lang="ko" suppressHydrationWarning>
      <body className="bg-[var(--bg-main)] text-[var(--text-main)]">
        <MusicPlayerProvider>
          {showHeader && <Header />}

          <main>
            {children}
          </main>
        </MusicPlayerProvider>
      </body>
    </html>
  );
}