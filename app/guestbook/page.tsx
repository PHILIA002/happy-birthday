import GuestbookForm from "@/components/GuestbookForm";
import GuestbookList from "@/components/GuestbookList";

export default function GuestbookPage() {
  return (
    <main className="max-w-3xl mx-auto pt-12 md:pt-24">
      <GuestbookForm />
      <GuestbookList />
    </main>
  );
}
