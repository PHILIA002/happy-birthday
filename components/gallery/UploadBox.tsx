"use client";

import { useState } from "react";
import { Upload } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface UploadBoxProps {
  onUploaded?: () => void;
}

export default function UploadBox({
  onUploaded,
}: UploadBoxProps) {
  const [loading, setLoading] = useState(false);

  const handleUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file || loading) return;

    try {
      if (!file.type.startsWith("image/")) {
        throw new Error("이미지 파일만 업로드 가능합니다.");
      }

      if (file.size > 10 * 1024 * 1024) {
        throw new Error("10MB 이하만 업로드 가능합니다.");
      }

      setLoading(true);

      const ext =
        file.name.split(".").pop()?.toLowerCase() || "jpg";

      const allowed = ["jpg", "jpeg", "png", "webp", "gif"];

      if (!allowed.includes(ext)) {
        throw new Error(
          "jpg, jpeg, png, webp, gif 파일만 가능합니다."
        );
      }

      const fileName = `${Date.now()}-${crypto.randomUUID()}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from("gallery")
        .upload(fileName, file, {
          upsert: false,
        });

      if (uploadError) {
        console.error("Storage Error:", uploadError);
        throw uploadError;
      }

      const {
        data: { publicUrl },
      } = supabase.storage
        .from("gallery")
        .getPublicUrl(fileName);

      const { error: dbError } = await supabase
        .from("gallery")
        .insert({
          image_url: publicUrl,
        });

      if (dbError) {
        console.error("DB Error:", dbError);

        await supabase.storage
          .from("gallery")
          .remove([fileName]);

        throw dbError;
      }

      alert("업로드 완료");

      e.target.value = "";

      onUploaded?.();
    } catch (error: any) {
      console.error(error);

      alert(
        error?.message ||
          "업로드 중 오류가 발생했습니다."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <label
      className="
        flex flex-col
        items-center justify-center
        w-full

        my-8
        py-8

        rounded-3xl
        border-2 border-dashed

        border-[var(--primary-soft)]/30
        bg-[var(--bg-sub)]

        cursor-pointer
        transition-all

        hover:border-[var(--primary)]

        disabled:pointer-events-none
      "
    >
      <Upload
        className="
          w-8 h-8
          text-[var(--primary)]
        "
      />

      <p className="font-medium">
        {loading
          ? "업로드 중..."
          : "팬아트 업로드"}
      </p>

      <p className="mt-1 text-xs text-[var(--text-sub)]">
        PNG · JPG · WEBP · GIF (최대 10MB)
      </p>

      <input
        hidden
        type="file"
        accept="image/*"
        disabled={loading}
        onChange={handleUpload}
      />
    </label>
  );
}