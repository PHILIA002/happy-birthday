"use client";

import { useRouter } from "next/navigation";

export default function IntroPage() {
  const router = useRouter();

  const handleEnter = () => {
    router.push("/main");
  };

  return (
    <div
      onClick={handleEnter}
      className="relative w-full h-screen cursor-pointer bg-[#dccfe7] overflow-hidden"
    >
      <img
        src="/intro.gif"
        alt="intro"
        className="w-full h-full object-contain"
      />

      <div className="absolute bottom-10 left-0 w-full text-center text-white text-sm opacity-70">
        아무 곳이나 클릭하여 입장
      </div>
    </div>
  );
}