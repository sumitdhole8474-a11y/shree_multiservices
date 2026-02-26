"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";

type Props = {
  images: string[];
  title: string;
};

export default function ServiceGallery({ images, title }: Props) {
  /* =========================================================
     SAFE IMAGE ARRAY (max 5, remove empty/null)
  ========================================================== */

  const safeImages = useMemo(() => {
    if (!Array.isArray(images)) return [];
    return images.filter(Boolean).slice(0, 5);
  }, [images]);

  const [activeImage, setActiveImage] = useState<string | null>(null);

  /* =========================================================
     SET DEFAULT IMAGE WHEN IMAGES CHANGE
  ========================================================== */

  useEffect(() => {
    if (safeImages.length > 0) {
      setActiveImage(safeImages[0]);
    } else {
      setActiveImage(null);
    }
  }, [safeImages]);

  /* =========================================================
     BASE64 CHECK
  ========================================================== */

  const isBase64 = (src?: string) =>
    typeof src === "string" && src.startsWith("data:image/");

  if (!activeImage) return null;

  return (
    <div className="w-full">
      {/* 🔹 BIG IMAGE */}
      <div className="relative w-full h-72 md:h-[380px] rounded-2xl overflow-hidden shadow-lg border border-gray-100">
        {isBase64(activeImage) ? (
          <img
            key={activeImage} // 🔥 forces refresh on change
            src={activeImage}
            alt={title}
            className="w-full h-full object-cover transition-all duration-300"
          />
        ) : (
          <Image
            key={activeImage} // 🔥 forces refresh
            src={activeImage}
            alt={title}
            fill
            priority
            className="object-cover transition-all duration-300"
          />
        )}
      </div>

      {/* 🔹 THUMBNAILS */}
      {safeImages.length > 1 && (
        <div className="flex gap-3 mt-4 flex-wrap">
          {safeImages.map((img, index) => (
            <button
              key={`${img}-${index}`}
              type="button"
              onClick={() => setActiveImage(img)}
              className={`relative h-16 w-16 rounded-lg overflow-hidden border-2 transition ${
                activeImage === img
                  ? "border-blue-600 scale-105"
                  : "border-gray-200 hover:border-gray-400"
              }`}
            >
              {isBase64(img) ? (
                <img
                  src={img}
                  alt={`${title} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Image
                  src={img}
                  alt={`${title} ${index + 1}`}
                  fill
                  className="object-cover"
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}