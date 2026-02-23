import CustomerSupportPage from "./CustomerSupportPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get In Touch With Our Support Team | Shree Multiservices",
  description:
    "Need assistance? Contact Shree Multiservices support team for help with insurance, loan, registration, and financial services in Amaravati.",
  openGraph: {
    title: "Get In Touch With Our Support Team | Shree Multiservices",
    description:
      "Reach our support team for quick assistance and professional guidance from Shree Multiservices.",
    url: "https://shreemultiservices.com/customer-support",
    siteName: "Shree Multiservices",
    locale: "en_IN",
    type: "website",
  },
};

export default function Page() {
  return <CustomerSupportPage />;
}