import TimelineProgress from "@/components/TimelineProgress";
import NoticeToast from "@/components/NoticeToast";
import Header from "@/components/fragments/Header";

export default function MainPage() {
  return (
    <>
      <main className="pt-28 md:pt-32">
        <TimelineProgress />
        <Header />
        <NoticeToast message="niniming fansite v2"/>
      </main>
    </>
  );
}