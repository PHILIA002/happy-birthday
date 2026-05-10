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
      className="w-full h-screen bg-black cursor-pointer"
    >
      <img
        src="/intro.gif"
        alt="intro"
        className="w-full h-full object-cover"
      />

      {/* 클릭 안내 텍스트 */}
      <div className="absolute bottom-10 w-full text-center text-white text-sm opacity-70">
        click anywhere to enter
      </div>
    </div>
  );
}