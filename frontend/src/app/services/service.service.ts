const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error("NEXT_PUBLIC_API_URL is not defined");
}

/* =========================================================
   TYPES
========================================================= */

export interface ServiceImage {
  image_url: string;
  sort_order: number;
}

export interface ServiceDetail {
  id: number;
  title: string;
  slug: string;

  // For category cards
  image_url?: string;

  short_description?: string;
  long_description?: string;

  category?: string;
  category_slug?: string;

  images: ServiceImage[];
}

/* =========================================================
   NORMALIZER
========================================================= */

const normalizeService = (service: any): ServiceDetail => {
  const images: ServiceImage[] = Array.isArray(service.images)
    ? (service.images as any[])
        .filter((img) => img && img.image_url)
        .map((img): ServiceImage => ({
          image_url: img.image_url,
          sort_order: Number(img.sort_order) || 0,
        }))
        .sort((a: ServiceImage, b: ServiceImage) => 
          a.sort_order - b.sort_order
        )
    : [];

  return {
    id: service.id,
    title: service.title,
    slug: service.slug,

    image_url: service.image_url || "",

    short_description: service.short_description || "",
    long_description: service.long_description || "",

    category: service.category || "",
    category_slug: service.category_slug || "",

    images,
  };
};

/* =========================================================
   GET SERVICES BY CATEGORY
========================================================= */

export const getServicesByCategory = async (
  categorySlug?: string
): Promise<ServiceDetail[]> => {
  if (!categorySlug) return [];

  try {
    const res = await fetch(
      `${API_URL}/api/services?categorySlug=${encodeURIComponent(
        categorySlug
      )}`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      console.error("getServicesByCategory failed:", res.status);
      return [];
    }

    const json = await res.json();

    if (!json?.success || !Array.isArray(json.data)) {
      return [];
    }

    return json.data.map(normalizeService);

  } catch (error) {
    console.error("getServicesByCategory error:", error);
    return [];
  }
};

/* =========================================================
   GET SINGLE SERVICE DETAIL
========================================================= */

export const getServiceDetail = async (
  slug: string
): Promise<ServiceDetail | null> => {
  try {
    const res = await fetch(
      `${API_URL}/api/services/${encodeURIComponent(slug)}`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      return null;
    }

    const json = await res.json();

    if (!json?.success || !json.data) {
      return null;
    }

    return normalizeService(json.data);

  } catch (error) {
    console.error("getServiceDetail error:", error);
    return null;
  }
};
