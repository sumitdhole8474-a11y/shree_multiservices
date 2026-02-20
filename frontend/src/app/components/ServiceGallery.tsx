"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

type Props = {
  images: string[]; // exactly 5 images from backend
  title: string;
};

export default function ServiceGallery({
  images,
  title,
}: Props) {
  /* =========================================================
     SAFE IMAGE ARRAY (max 5 only)
  ========================================================== */

  const safeImages = Array.isArray(images)
    ? images.filter(Boolean).slice(0, 5)
    : [];

  const [activeImage, setActiveImage] = useState<string>("");

  /* =========================================================
     SET DEFAULT IMAGE (first one)
  ========================================================== */

  useEffect(() => {
    if (safeImages.length > 0) {
      setActiveImage(safeImages[0]);
    }
  }, [images]);

  /* =========================================================
     BASE64 CHECK
  ========================================================== */

  const isBase64 = (src?: string) =>
    typeof src === "string" && src.startsWith("data:image/");

  if (!activeImage) return null;

  return (
    <div className="w-full">
      
      {/* 🔹 BIG IMAGE */}
      <div className="relative w-full h-72 md:h-[420px] rounded-2xl overflow-hidden shadow-lg border border-gray-100">
        {isBase64(activeImage) ? (
          <img
            src={activeImage}
            alt={title}
            className="w-full h-full object-cover transition-all duration-300"
          />
        ) : (
          <Image
            src={activeImage}
            alt={title}
            fill
            priority
            className="object-cover transition-all duration-300"
          />
        )}
      </div>

      {/* 🔹 4 SMALL THUMBNAILS */}
      {safeImages.length > 1 && (
        <div className="grid grid-cols-4 gap-4 mt-4">
          {safeImages.slice(0, 4).map((img, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setActiveImage(img)}
              className={`relative h-20 rounded-xl overflow-hidden border-2 transition ${
                activeImage === img
                  ? "border-blue-600"
                  : "border-gray-200"
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
