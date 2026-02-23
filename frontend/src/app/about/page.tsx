import AboutPage from "./AboutPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Know more about us | Shree Multiservices",
  description:
    "Learn more about Shree Multiservices, our expertise, services, and commitment to providing trusted financial and registration solutions in Amaravati.",
  openGraph: {
    title: "Know more about us | Shree Multiservices",
    description:
      "Discover Shree Multiservices — trusted experts in insurance, loans, registration, and financial services in Amaravati.",
    url: "https://shreemultiservices.com/about",
    siteName: "Shree Multiservices",
    locale: "en_IN",
    type: "website",
  },
};

export default function Page() {
  return <AboutPage />;
}