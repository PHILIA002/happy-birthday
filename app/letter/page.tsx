import AppShell from "@/components/layout/AppShell";
import { LETTER } from "@/data/letter";

export default function LetterPage() {
  return (
    <AppShell>
      <main
        className="
          mt-[72px]
          min-h-[calc(100dvh-72px)]

          flex
          items-center
          justify-center

          w-full

          p-4
          lg:p-8
        "
      >
        <div
          className="
            relative

            w-full
            max-w-3xl

            overflow-hidden

            rounded-2xl
            lg:rounded-3xl

            border border-[var(--border)]

            bg-[var(--surface)]

            shadow-[0_16px_40px_rgba(0,0,0,0.08)]
          "
        >
          <div
            className="
              relative

              px-5
              py-5

              lg:px-8
              lg:py-8
            "
          >
            <p
              className="
                font-semibold
                text-[clamp(1rem,4vw,1.25rem)]
                text-[var(--primary)]
              "
            >
              To. 니니밍
            </p>
          </div>

          <div
            className="
              relative

              px-5
              lg:px-8
            "
          >
            <div
              className="
                relative

                whitespace-pre-line

                px-2
                lg:px-8

                text-[clamp(0.95rem,3.8vw,1rem)]
                leading-8

                text-[var(--text-main)]
              "
              style={{
                backgroundImage: `
                  repeating-linear-gradient(
                    to bottom,
                    transparent 0,
                    transparent 31px,
                    var(--primary) 31px,
                    var(--primary) 32px
                  )
                `,
              }}
            >
              {LETTER}
            </div>

            <div
              className="
                mt-10
                mb-6

                lg:mt-12
                lg:mb-8

                text-right
              "
            >
              <p
                className="
                  text-[clamp(0.75rem,3vw,0.875rem)]
                  text-[var(--text-sub)]
                "
              >
                항상 행복하길 바라며.
              </p>

              <p
                className="
                  mt-2

                  font-semibold

                  text-[clamp(0.95rem,3.5vw,1rem)]
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