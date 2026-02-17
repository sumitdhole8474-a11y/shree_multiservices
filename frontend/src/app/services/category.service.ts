const API_URL = process.env.NEXT_PUBLIC_API_URL;

// ✅ Add this interface for Type Safety
export interface Category {
  id: number;
  title: string;
  slug: string;
  is_active: boolean;
}

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

    return await res.json();
  } catch (error) {
    console.error("❌ getCategories error:", error);
    return [];
  }
};
