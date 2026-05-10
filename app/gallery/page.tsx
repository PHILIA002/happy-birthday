"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ImageGallery() {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      const { data } = await supabase
        .from("uploads")
        .select("image_url")
        .order("created_at", { ascending: false });

      if (data) {
        setImages(data.map((item) => item.image_url));
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
      {images.map((src, i) => (
        <img
          key={i}
          src={src}
          className="w-full h-40 object-cover rounded-lg"
        />
      ))}
    </div>
  );
}