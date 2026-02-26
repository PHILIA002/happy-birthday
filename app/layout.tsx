import { Metadata } from "next";
import { Baloo_2, Jua } from "next/font/google";
import ClientShell from "@/components/ClientShell";
import Cursor from "@/components/Cursor";
import "./globals.css";

export const metadata: Metadata = {
  title: "니니밍 생일 축하해 🎂",
  description: "니니밍을 위한 생일 기념 페이지",

  icons: {
    icon: "/favicons/favicon.ico",
    apple: "/favicons/apple-touch-icon.png",
  },

  manifest: "/favicons/manifest.webmanifest",

  openGraph: {
    title: "Happy Birthday Project",
    description: "Happy Birthday Web Project",
    type: "website",
  },
};

const baloo = Baloo_2({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "600", "700"],
  variable: "--font-baloo",
});

const jua = Jua({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-jua",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body
        className={`
          ${baloo.variable} ${jua.variable}
          min-h-screen flex flex-col
        `}
      >
        <Cursor />
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}