import { Metadata } from "next";
import "./globals.css";
import { Baloo_2, Jua } from "next/font/google";

export const metadata: Metadata = {
  title: "니니밍 생일 축하해 🎂",
  description: "니니밍을 위한 생일 기념 페이지",
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
      <body className={`${baloo.variable} ${jua.variable}`}>
        {children}
      </body>
    </html>
  );
}
