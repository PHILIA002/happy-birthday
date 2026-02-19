import GuestbookForm from "@/components/GuestbookForm";
import GuestbookList from "@/components/GuestbookList";
import GuestbookGuide from "@/components/GuestbookGuide";

export default function GuestbookPage() {
  return (
    <section
      className="
        py-12 md:py-24
        w-full
        max-w-[1400px]
        mx-auto
        px-4 md:px-6
      "
    >
      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-[1fr_auto_1fr]
          items-start
        "
      >
        {/* LEFT EMPTY SPACE */}
        <div className="hidden md:block" />

        {/* FORM */}
        <div className="flex justify-center">
          <div className="w-3xl max-w-[760px] md:max-w-[820px] lg:max-w-[900px]">
            <GuestbookForm />
            <GuestbookList />
          </div>
        </div>

        {/* GUIDE */}
        <div className="hidden xl:flex justify-center">
          <div className="w-[300px]">
            <GuestbookGuide />
          </div>
        </div>
      </div>
    </section>
  );
}
