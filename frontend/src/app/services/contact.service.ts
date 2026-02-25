const API_URL = process.env.NEXT_PUBLIC_API_URL;

export type ContactData = {
  address: string;
  phone1: string;
  phone2: string;
  email: string;
  business_hours: string;
  facebook_url: string;
  instagram_url: string;
  google_url: string;
  map_embed_url: string;
  status: string; // ✅ ADDED
};

export const getContactDetails = async (): Promise<ContactData> => {
  try {
    const res = await fetch(`${API_URL}/api/contact`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch contact details");
    }

    return await res.json();
  } catch (error) {
    console.error("Contact fetch error:", error);

    // Optional fallback (prevents crash)
    return {
      address: "",
      phone1: "",
      phone2: "",
      email: "",
      business_hours: "",
      facebook_url: "",
      instagram_url: "",
      google_url: "",
      map_embed_url: "",
      status: "working", // ✅ DEFAULT FALLBACK
    };
  }
};