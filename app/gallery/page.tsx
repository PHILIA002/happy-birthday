import UploadBox from "@/components/gallery/UploadBox";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import AppShell from "@/components/layout/AppShell";

export default function GalleryPage() {
  return (
    <AppShell>
      <main
        className="
          max-w-7xl
          mx-auto

          px-4
          py-8
        "
      >
        <div className="mb-8">
          <UploadBox />
        </div>

        <GalleryGrid />
      </main>
    </AppShell>
  );
}