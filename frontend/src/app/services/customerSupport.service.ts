const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const submitCustomerSupport = async (data: {
  name: string;
  mobile: string;
  email?: string;
  address?: string;
  query: string;
}) => {
  try {
    if (!API_URL) {
      console.warn("⚠️ NEXT_PUBLIC_API_URL not defined");
      return { success: false };
    }

    const res = await fetch(`${API_URL}/api/customer-support`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      console.warn("⚠️ Failed to submit customer support query:", res.status);
      return { success: false };
    }

    return await res.json();
  } catch (error) {
    console.error("❌ submitCustomerSupport error:", error);
    return { success: false };
  }
};
