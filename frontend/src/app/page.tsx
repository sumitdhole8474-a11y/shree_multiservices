export const dynamic = "force-dynamic";

import HeroSection from "./components/HeroSection";
import OurServicesSection from "./components/OurServices/OurServicesSection";
import EnquiryForm from "@/app/components/EnquiryForm";
import CustomerFeedback from "./components/CustomerFeedback";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <OurServicesSection />
      <EnquiryForm />
      <CustomerFeedback />
    </>
  );
}