import { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "니니밍 생일 축하해",
  description: "니니밍 생일 기념 페이지",
};

const noto = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto",
  display: "swap",
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
          ${noto.variable}
          min-h-screen flex flex-col
          font-sans
        `}
      >
        {children}
      </body>
    </html>
  );
}