"use client";

import { X, Star } from "lucide-react";
import { useState } from "react";
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

  if (!open) return null;

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

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

  /* =============================
     MOBILE NUMBER HANDLER
  ============================= */
  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ""); // remove non-numbers

    if (value.length <= 10) {
      setForm({ ...form, mobile: value });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-full max-w-lg relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-black">
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
              className={`cursor-pointer ${
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
            className="input"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            required
          />

          <input
            placeholder="Mobile"
            className="input"
            value={form.mobile}
            onChange={handleMobileChange}
            inputMode="numeric"
            pattern="[0-9]{10}"
            maxLength={10}
            required
          />

          <textarea
            placeholder="Review"
            className="input h-32"
            value={form.review}
            onChange={(e) =>
              setForm({ ...form, review: e.target.value })
            }
            required
          />

          {error && (
            <p className="text-red-500">{error}</p>
          )}

          <button className="btn-primary text-bold text-white w-full bg-blue-600 rounded-2xl py-2">
            {loading ? "Submitting..." : "Submit Review"}
          </button>
        </form>
      </div>
    </div>
  );
}
