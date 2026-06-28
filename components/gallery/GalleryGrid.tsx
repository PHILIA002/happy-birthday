"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import ImageModal from "../ImageModal";
import { Heart, Pointer } from "lucide-react";

type GalleryItem = {
  id: string;
  image_url: string;
  likes: number;
  created_at: string;
};

export default function GalleryGrid() {
  const [images, setImages] = useState<GalleryItem[]>([]);
  const [likedIds, setLikedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] =
    useState<string | null>(null);

  useEffect(() => {
    fetchGallery();

    const saved = JSON.parse(
      localStorage.getItem("gallery_likes") || "[]"
    );

    setLikedIds(saved);
  }, []);

  async function fetchGallery() {
    const { data, error } = await supabase
      .from("gallery")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
    }

    if (data) {
      setImages(data);
    }

    setLoading(false);
  }

async function handleLike(id: string) {
  const target = images.find((item) => item.id === id);

  if (!target) return;

  const alreadyLiked = likedIds.includes(id);

  const newLikes = alreadyLiked
    ? Math.max(0, target.likes - 1)
    : target.likes + 1;

  const { error } = await supabase
    .from("gallery")
    .update({ likes: newLikes })
    .eq("id", id);

  if (error) {
    console.error(error);
    return;
  }

  setImages((prev) =>
    prev.map((item) =>
      item.id === id
        ? { ...item, likes: newLikes }
        : item
    )
  );

  const updated = alreadyLiked
    ? likedIds.filter((likedId) => likedId !== id)
    : [...likedIds, id];

  setLikedIds(updated);

  localStorage.setItem(
    "gallery_likes",
    JSON.stringify(updated)
  );
}

  if (loading) {
    return (
      <div className="py-10 text-center text-[var(--text-sub)]">
        불러오는 중...
      </div>
    );
  }

  return (
    <>
      <div
        className="
          columns-2
          md:columns-3
          lg:columns-4

          gap-4
          space-y-4
        "
      >
        {images.map((image) => (
          <div
            key={image.id}
            className="
              relative
              mb-4
              break-inside-avoid

              overflow-hidden
              rounded-2xl

              bg-[var(--bg-sub)]
            "
          >
            <img
              src={image.image_url}
              alt="팬아트"
              loading="lazy"
              onClick={() =>
                setSelectedImage(image.image_url)
              }
              className="
                block
                w-full
                h-auto

                cursor-pointer

                transition-transform
                duration-300

                hover:scale-105
              "
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleLike(image.id);
              }}
              className="
                absolute
                left-3
                bottom-3

                flex
                items-center
                gap-1

                rounded-full
                bg-black/60
                px-2
                py-1

                text-white
                text-xs

                backdrop-blur-sm

                transition

                hover:bg-black/80
                cursor-pointer
              "
            >
              <Heart
                size={16}
                color="var(--heart)"
                fill={
                  likedIds.includes(image.id)
                    ? "var(--heart)"
                    : "transparent"
                }
              />
              <span>{image.likes}</span>
            </button>
          </div>
        ))}
      </div>

      {selectedImage && (
        <ImageModal
          src={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </>
  );
}