import AppShell from "@/components/layout/AppShell";
import { LETTER } from "@/data/letter";

export default function LetterPage() {
  return (
    <AppShell>
      <main
        className="
          flex
          items-center
          justify-center

          w-full
          h-full
          min-h-0

          p-4
          md:p-8
        "
      >
        <div
          className="
            w-full
            max-w-3xl

            overflow-hidden

            rounded-3xl
            border border-[var(--border)]

            bg-[var(--surface)]
            shadow-xl
            mt-8
          "
        >
          <div
            className="
              border-b border-[var(--border)]

              px-6
              py-5
            "
          >
            <h1 className="text-2xl font-bold text-[var(--text-main)]">
              생일 편지
            </h1>

            <p className="mt-1 text-sm text-[var(--text-sub)]">
              오늘만 열어볼 수 있는 편지입니다.
            </p>
          </div>

          <div
            className="
              whitespace-pre-line

              px-6
              py-8

              text-[15px]
              leading-8

              text-[var(--text-main)]
            "
          >
            {LETTER}
          </div>
        </div>
      </main>
    </AppShell>
  );
}