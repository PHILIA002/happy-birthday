import { Mail } from "lucide-react";

import AppShell from "@/components/layout/AppShell";
import { LETTER } from "@/data/letter";

export default function LetterPage() {
  return (
    <AppShell>
      <main
        className="
          flex flex-col
          items-center justify-center
          w-full

          my-8
          p-8
        "
      >
        <div
          className="
            relative

            w-full
            max-w-3xl

            overflow-hidden

            rounded-3xl
            border border-[var(--border)]

            bg-[var(--surface)]

            shadow-[0_16px_40px_rgba(0,0,0,0.08)]
          "
        >

          <div className="relative px-8 py-8">
            <p
              className="
                text-xl
                font-semibold

                text-[var(--primary)]
              "
            >
              To. 니니밍
            </p>
          </div>

          <div className="relative px-8">
            <div
              className="
                relative

                whitespace-pre-line

                px-4 lg:px-8

                text-[16px]
                leading-9

                text-[var(--text-main)]
              "
              style={{
                backgroundImage: `
                  repeating-linear-gradient(
                    to bottom,
                    transparent 0,
                    transparent 35px,
                    var(--primary) 35px,
                    transparent 36px
                  )
                `,
              }}
            >
              {LETTER}
            </div>

            <div
              className="
                mt-12 mb-8

                text-right
              "
            >
              <p className="text-sm text-[var(--text-sub)]">
                항상 행복하길 바라며.
              </p>

              <p
                className="
                  mt-2

                  font-semibold
                  text-[var(--primary)]
                "
              >
                From. 니밍너무좋아 ♥
              </p>
            </div>
          </div>
        </div>
      </main>
    </AppShell>
  );
}