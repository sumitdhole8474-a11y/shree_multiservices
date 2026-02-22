"use client";

import { X, Star } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export default function ReviewModal({ open, onClose }: any) {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    mobile: "",
    review: "",
    rating: 5,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* =============================
     LOCK BACKGROUND SCROLL
  ============================= */
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  /* =============================
     CHARACTER COUNT (200 MAX)
  ============================= */
  const charCount = form.review.length;
  const maxChars = 200;

  const handleReviewChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const text = e.target.value;

    if (text.length <= maxChars) {
      setForm({ ...form, review: text });
    }
  };

  /* =============================
     MOBILE NUMBER HANDLER
  ============================= */
  const handleMobileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 10) {
      setForm({ ...form, mobile: value });
    }
  };

  /* =============================
     SUBMIT HANDLER
  ============================= */
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (charCount > maxChars) {
      setError("Review cannot exceed 200 characters");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error();

      setForm({ name: "", mobile: "", review: "", rating: 5 });
      onClose();
      router.refresh();
    } catch {
      setError("Failed to submit review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center px-4">
      <div className="bg-white p-6 rounded-xl w-full max-w-lg relative z-[101]">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-black hover:opacity-70 transition"
          aria-label="Close review modal"
        >
          <X />
        </button>

        <h2 className="text-2xl text-black font-bold mb-4">
          Write a Review
        </h2>

        {/* ⭐ STAR RATING */}
        <div className="flex gap-1 mb-4">
          {[1, 2, 3, 4, 5].map((n) => (
            <Star
              key={n}
              onClick={() => setForm({ ...form, rating: n })}
              className={`cursor-pointer transition ${
                n <= form.rating
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-gray-300"
              }`}
            />
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            placeholder="Name"
            className="input text-black caret-blue-600"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            required
          />

          <input
            placeholder="Mobile"
            className="input text-black caret-blue-600"
            value={form.mobile}
            onChange={handleMobileChange}
            inputMode="numeric"
            pattern="[0-9]{10}"
            maxLength={10}
            required
          />

          {/* ✅ Character Limited Review */}
          <div>
            <textarea
              placeholder="Write your review "
              className="input resize-none h-30 text-black caret-blue-600"
              value={form.review}
              onChange={handleReviewChange}
              required
            />

            <div className="text-right text-xs mt-1">
              <span
                className={`${
                  charCount >= maxChars
                    ? "text-red-500"
                    : "text-gray-400"
                }`}
              >
                {charCount}/{maxChars} 
              </span>
            </div>
          </div>

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="text-white w-full bg-blue-600 rounded-2xl py-2 disabled:opacity-70"
          >
            {loading ? "Submitting..." : "Submit Review"}
          </button>
        </form>
      </div>
    </div>
  );
}