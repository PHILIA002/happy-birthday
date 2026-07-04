import "./globals.css";

import { MusicPlayerProvider } from "@/components/music/MusicPlayerProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="bg-[var(--bg-main)] text-[var(--text-main)]">
        <MusicPlayerProvider>
          {children}
        </MusicPlayerProvider>
      </body>
    </html>
  );
}