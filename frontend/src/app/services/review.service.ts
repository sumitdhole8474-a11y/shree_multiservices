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

export type SubmitReviewPayload = {
  name: string;
  mobile: string;
  review: string;
  rating: number;
};

export type SubmitReviewResponse = {
  id?: number;
  name?: string;
  review?: string;
  rating?: number;
  created_at?: string;
  success?: boolean;
  message?: string;
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

    const response = await fetch(`${API_URL}/api/reviews`, {
      method: "GET",
      cache: "no-store",
    });

    if (!response.ok) {
      console.warn("⚠️ Failed to fetch reviews:", response.status);
      return [];
    }

    const data: Review[] = await response.json();
    return data;
  } catch (error) {
    console.error("❌ getReviews error:", error);
    return [];
  }
};


/* =========================
   SUBMIT REVIEW
   (Will be hidden first)
========================= */

export const submitReview = async (
  payload: SubmitReviewPayload
): Promise<SubmitReviewResponse> => {
  try {
    if (!API_URL) {
      console.warn("⚠️ NEXT_PUBLIC_API_URL not defined");
      return { success: false, message: "API URL not configured" };
    }

    const response = await fetch(`${API_URL}/api/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      console.warn("⚠️ Failed to submit review:", response.status);
      return {
        success: false,
        message: data?.message || "Failed to submit review",
      };
    }

    return {
      ...data,
      success: true,
    };
  } catch (error) {
    console.error("❌ submitReview error:", error);
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};