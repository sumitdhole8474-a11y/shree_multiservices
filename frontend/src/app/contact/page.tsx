import ContactPage from "./ContactPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact With Us | Shree Multiservices",
  description:
    "Get in touch with Shree Multiservices for insurance, loan, registration, and financial services in Amaravati. Call, email, or visit us today.",
  openGraph: {
    title: "Contact With Us | Shree Multiservices",
    description:
      "Reach out to Shree Multiservices for trusted financial and registration services in Amaravati.",
    url: "https://shreemultiservices.com/contact",
    siteName: "Shree Multiservices",
    locale: "en_IN",
    type: "website",
  },
};

export default function Page() {
  return <ContactPage />;
}