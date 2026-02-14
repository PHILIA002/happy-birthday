"use client";

import GlassCard from "./GlassCard";
import { CheckLine, RefreshCcw } from "lucide-react";

export default function GuestbookGuide() {
  return (
    <section className="py-8 md:py-16">

      <div className="md:sticky md:top-24 self-start">

        <GlassCard
          className="
            p-6
            space-y-4
            text-sm md:text-base
            text-[#5E4B87]
            leading-relaxed
          "
        >
          <h3 className="font-semibold text-[#4F3F6B] flex items-center gap-2">
            <CheckLine className="w-5 h-5"/>
            <span>방명록 이용 안내</span>
          </h3>

          <ol className="list-disc pl-5 space-y-2 mt-2">
            <li>
              욕설 / 광고 / 도배는<br />
              삭제될 수 있어요.
            </li>
            <li>닉네임은 선택 입력입니다.</li>
            <li>
              메시지 입력 후 버튼 또는 Enter<br />
              를 누르면 등록됩니다.
            </li>
            <li>
              메시지 입력 중 Shift + Enter<br />
              를 누르면 줄바꿈이 됩니다.
            </li>
            <li>최대 300자까지 입력 가능합니다.</li>
          </ol>

          <div
            className="
              pt-3 mt-3
              border-t border-white/30
              text-xs opacity-80
              flex items-center gap-2
              group
            "
          >
            <RefreshCcw
              className="
                w-4 h-4
                transition-transform duration-500 ease-out
                group-hover:-rotate-180
              "
            />
            <span>등록 후 반영이 늦으면 새로고침 해주세요</span>
          </div>
        </GlassCard>

      </div>
    </section>
  );
}
