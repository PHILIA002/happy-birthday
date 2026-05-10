"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ImageUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;

    // 1. 파일 타입 검사
    if (!file.type.startsWith("image/")) {
      alert("이미지 파일만 가능");
      return;
    }

    // 2. 파일 크기 제한 (3MB)
    if (file.size > 3 * 1024 * 1024) {
      alert("3MB 이하만 업로드 가능");
      return;
    }

    setLoading(true);

    // 3. 파일명 랜덤 생성
    const fileName = `${crypto.randomUUID()}`;

    // 4. 업로드
    const { error: uploadError } = await supabase.storage
      .from("images")
      .upload(fileName, file);

    if (uploadError) {
      console.error(uploadError);
      setLoading(false);
      return;
    }

    // 5. URL 생성
    const { data } = supabase.storage
      .from("images")
      .getPublicUrl(fileName);

    const imageUrl = data.publicUrl;

    // 6. DB 저장
    await supabase.from("uploads").insert({
      image_url: imageUrl,
    });

    setFile(null);
    setLoading(false);
  };

  return (
    <div className="space-y-3">
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />

      <button
        onClick={handleUpload}
        disabled={loading}
        className="px-4 py-2 bg-[var(--primary)] text-white rounded"
      >
        {loading ? "업로드 중..." : "업로드"}
      </button>
    </div>
  );
}