const API_URL = process.env.NEXT_PUBLIC_API_URL;

/* =============================
   CATEGORY TYPE
============================= */
export interface Category {
  id: number;
  title: string;
  slug: string;
}

/* =============================
   GET PUBLIC CATEGORIES
   (Ordered by sort_order in backend)
============================= */
export const getCategories = async (): Promise<Category[]> => {
  try {
    if (!API_URL) {
      console.warn("⚠️ NEXT_PUBLIC_API_URL not defined");
      return [];
    }

    const res = await fetch(`${API_URL}/api/categories`, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.warn("⚠️ Failed to fetch categories:", res.status);
      return [];
    }

    const data = await res.json();

    // Ensure array safety
    if (!Array.isArray(data)) {
      console.warn("⚠️ Invalid categories response");
      return [];
    }

    return data as Category[];
  } catch (error) {
    console.error("❌ getCategories error:", error);
    return [];
  }
};