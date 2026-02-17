const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface ServiceDetail {
  id: number;
  title: string;
  slug: string;
  image_url: string;
  short_description?: string;
  long_description?: string;
  category: string;
  category_slug: string;
}

/**
 * Fetch services by category slug
 */
export const getServicesByCategory = async (
  categorySlug?: string
): Promise<ServiceDetail[]> => {
  if (!categorySlug || !API_URL) {
    console.log("❌ getServicesByCategory: No slug or API URL");
    return [];
  }

  const url = `${API_URL}/api/services?categorySlug=${encodeURIComponent(categorySlug)}`;

  // --- DEBUG LOG ---
  console.log(`📡 Fetching: ${url}`);

  try {
    const res = await fetch(url, { cache: "no-store" });

    // --- ERROR LOG ---
    if (!res.ok) {
      console.error(`❌ API Error [${res.status}]: ${res.statusText}`);
      const text = await res.text();
      console.error(`   Response Body: ${text}`);
      return [];
    }

    const data = await res.json();
    console.log(`✅ Success! Received ${data.length} services for ${categorySlug}`);
    return data;
  } catch (error) {
    console.error("❌ Network/Fetch Error:", error);
    return [];
  }
};

/**
 * Fetch single service detail by slug
 */
export const getServiceDetail = async (
  slug: string
): Promise<ServiceDetail | null> => {
  if (!API_URL) {
    console.warn("⚠️ NEXT_PUBLIC_API_URL not defined");
    return null;
  }

  const url = `${API_URL}/api/services/${encodeURIComponent(slug)}`;
  console.log(`📡 Fetching Detail: ${url}`);

  try {
    const res = await fetch(url, { cache: "no-store" });

    if (res.status === 404) {
      return null;
    }

    if (!res.ok) {
      console.error(`❌ Detail API Error [${res.status}]`);
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error("❌ getServiceDetail error:", error);
    return null;
  }
};
