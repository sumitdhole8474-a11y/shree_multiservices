const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const sendContactMessage = async (data: {
  name: string;
  mobile: string;
  email?: string;
  message: string;
}) => {
  try {
    if (!API_URL) {
      console.warn("⚠️ NEXT_PUBLIC_API_URL not defined");
      return { success: false };
    }

    const res = await fetch(`${API_URL}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      console.warn("⚠️ Failed to send message:", res.status);
      return { success: false };
    }

    return await res.json();
  } catch (error) {
    console.error("❌ sendContactMessage error:", error);
    return { success: false };
  }
};
