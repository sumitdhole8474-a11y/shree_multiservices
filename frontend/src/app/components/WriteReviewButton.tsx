"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import ReviewModal from "@/app/components/ReviewModal";

export default function WriteReviewButton() {
  const [openReview, setOpenReview] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpenReview(true)}
        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full font-semibold hover:scale-105 transition"
      >
        <Star className="text-yellow-400 fill-yellow-400" size={18} />
        Write a Review
      </button>

      <ReviewModal
        open={openReview}
        onClose={() => setOpenReview(false)}
      />
    </>
  );
}
