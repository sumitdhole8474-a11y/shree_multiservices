const API_URL = process.env.NEXT_PUBLIC_API_URL;

/* =========================
   TYPES
========================= */
export type Review = {
  id: number;
  name: string;
  review: string;
  rating: number;
  created_at: string;
};

/* =========================
   GET VISIBLE REVIEWS
========================= */
export const getReviews = async (): Promise<Review[]> => {
  try {
    if (!API_URL) {
      console.warn("⚠️ NEXT_PUBLIC_API_URL not defined");
      return [];
    }

    const res = await fetch(`${API_URL}/api/reviews`, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.warn("⚠️ Failed to fetch reviews:", res.status);
      return [];
    }

    return await res.json();
  } catch (error) {
    console.error("❌ getReviews error:", error);
    return [];
  }
};

/* =========================
   SUBMIT REVIEW
========================= */
export const submitReview = async (formData: {
  name: string;
  mobile: string;
  review: string;
  rating: number;
}) => {
  try {
    if (!API_URL) {
      console.warn("⚠️ NEXT_PUBLIC_API_URL not defined");
      return { success: false };
    }

    const res = await fetch(`${API_URL}/api/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      console.warn("⚠️ Failed to submit review:", res.status);
      return { success: false };
    }

    return await res.json();
  } catch (error) {
    console.error("❌ submitReview error:", error);
    return { success: false };
  }
};
