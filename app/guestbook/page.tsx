import GuestbookForm from "@/components/GuestbookForm";
import GuestbookList from "@/components/GuestbookList";

export default function GuestbookPage() {
  return (
    <main className="max-w-2xl mx-auto p-6 space-y-6">
      <GuestbookForm />
      <GuestbookList />
    </main>
  );
}
