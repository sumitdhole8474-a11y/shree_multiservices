import {
  getServiceDetail,
  getServicesByCategory,
} from "@/app/services/service.service";
import ServiceSlider from "@/app/components/OurServices/ServiceSlider";
import ShareWidget from "@/app/components/ShareWidget";
import ServiceGallery from "@/app/components/ServiceGallery";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

/* =========================================================
    SEO METADATA GENERATION
========================================================== */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceDetail(slug);

  if (!service) {
    return {
      title: "Service Not Found | Shree Multiservices",
    };
  }

  const serviceTitle = service.title || "Shree Multiservices";

  // ✅ NEW STRUCTURE
  const title = `Best ${serviceTitle} in Amaravati | Shree Multiservices`;

  const description =
    service.short_description ||
    `Looking for the best ${serviceTitle} in Amaravati? Shree Multiservices provides trusted and professional services tailored to your needs.`;

  return {
    title: title,
    description: description,
    alternates: {
      canonical: `https://shreemultiservices.com/services/${slug}`,
    },
    openGraph: {
      title: title,
      description: description,
      url: `https://shreemultiservices.com/services/${slug}`,
      siteName: "Shree Multiservices",
      images: service.images?.[0]?.image_url
        ? [{ url: service.images[0].image_url }]
        : [],
      locale: "en_IN",
      type: "website",
    },
    keywords: [
      `${serviceTitle} in Amaravati`,
      `Best ${serviceTitle}`,
      "Shree Multiservices Amaravati",
      "Professional services in Amaravati",
    ],
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = await getServiceDetail(slug);

  if (!service) {
    notFound();
  }

  /* =========================================================
      STRUCTURED DATA (JSON-LD) FOR LOCAL SEO
  ========================================================== */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.title,
    "description": service.short_description || "Professional services in Amaravati",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Shree Multiservices",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Amaravati",
        "addressRegion": "Maharashtra",
        "addressCountry": "IN"
      }
    },
    "areaServed": "Amaravati",
    "image": service.images?.[0]?.image_url || ""
  };

  /* =========================================================
      5 IMAGE GALLERY LOGIC
  ========================================================== */
  const galleryImages =
    Array.isArray(service.images) && service.images.length > 0
      ? service.images.slice(0, 5)
      : [];

  /* =========================================================
      RELATED SERVICES
  ========================================================== */
  const relatedServices = await getServicesByCategory(service.category_slug);
  const filteredRelated = relatedServices.filter((s) => s.slug !== slug);

  return (
    <main className="bg-white min-h-screen pt-16 md:pt-24">
      {/* Add Schema to Head */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* 🔵 Category Header */}
      <section className="w-full pb-8 flex justify-center">
        <h1 className="text-center text-3xl font-bold text-white bg-blue-600 rounded-full px-6 py-2 tracking-wide shadow-md">
          {service.category || "Service Detail"}
        </h1>
      </section>

      {/* 🔹 Service Detail */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          
          <ServiceGallery
            images={galleryImages.map((img) => img.image_url)}
            title={service.title}
          />

          {/* 🔹 Content */}
          <div className="flex flex-col">
            <h2 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
              {service.title}
            </h2>

            <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-wrap">
              {service.long_description ||
                service.short_description ||
                "Detailed description coming soon."}
            </p>

            {/* 🔹 Actions */}
            <div className="flex flex-wrap items-center gap-4 mt-10">
              <a
                href={`https://wa.me/919876543210?text=I%20am%20interested%20in%20${encodeURIComponent(
                  service.title || "your services"
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-green-500 hover:bg-green-600 transition text-white rounded-full font-semibold shadow-md flex items-center gap-2"
              >
                WhatsApp Enquiry
              </a>

           <ShareWidget 
  title={service.title} 
  category={service.category || "Professional Services"} 
/>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6">
        <hr className="border-gray-200" />
      </div>

      {/* 🔹 Related Services */}
      {filteredRelated.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 py-16">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <span className="w-1.5 h-8 bg-blue-600 rounded-full" />
              Related Services
            </h3>

            <Link
              href={`/categories/${service.category_slug}`}
              className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition flex items-center gap-1"
            >
              View All
              <span aria-hidden>→</span>
            </Link>
          </div>

          <ServiceSlider services={filteredRelated} />
        </section>
      )}
    </main>
  );
}