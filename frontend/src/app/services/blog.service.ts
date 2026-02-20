const API_URL = process.env.NEXT_PUBLIC_API_URL;

/* =========================================================
   BLOG CARDS
========================================================= */
export const getBlogs = async () => {
  try {
    if (!API_URL) {
      console.warn("⚠️ NEXT_PUBLIC_API_URL not defined");
      return [];
    }

    const res = await fetch(`${API_URL}/api/blogs`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      console.warn("⚠️ Failed to fetch blogs:", res.status);
      return [];
    }

    const data = await res.json();

    return Array.isArray(data) ? data : [];

  } catch (error) {
    console.error("❌ getBlogs error:", error);
    return [];
  }
};


/* =========================================================
   BLOG DETAIL
========================================================= */
export const getBlogBySlug = async (slug: string) => {
  try {
    if (!API_URL) {
      console.warn("⚠️ NEXT_PUBLIC_API_URL not defined");
      return null;
    }

    if (!slug) {
      console.warn("⚠️ Slug is missing");
      return null;
    }

    const res = await fetch(`${API_URL}/api/blogs/${slug}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (res.status === 404) {
      return null;
    }

    if (!res.ok) {
      console.warn("⚠️ Failed to fetch blog:", res.status);
      return null;
    }

    const data = await res.json();

    return data || null;

  } catch (error) {
    console.error("❌ getBlogBySlug error:", error);
    return null;
  }
};
