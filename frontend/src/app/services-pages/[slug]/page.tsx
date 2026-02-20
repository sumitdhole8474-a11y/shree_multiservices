import {
  getServiceDetail,
  getServicesByCategory,
} from "@/app/services/service.service";
import ServiceSlider from "@/app/components/OurServices/ServiceSlider";
import ShareWidget from "@/app/components/ShareWidget";
import ServiceGallery from "@/app/components/ServiceGallery";
import { notFound } from "next/navigation";
import Link from "next/link";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ServiceDetailPage({ params }: Props) {
  // ✅ FIX: Await params
  const { slug } = await params;

  const service = await getServiceDetail(slug);

  if (!service) {
    notFound();
  }

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

  const relatedServices = await getServicesByCategory(
    service.category_slug
  );

  const filteredRelated = relatedServices.filter(
    (s) => s.slug !== slug
  );

  return (
    <main className="bg-white min-h-screen pt-24">
      
      {/* 🔵 Category Header */}
      <section className="w-full pb-8 flex justify-center">
        <h1 className="text-center text-3xl font-bold text-white bg-blue-600 rounded-full px-6 py-2 tracking-wide shadow-md">
          {service.category}
        </h1>
      </section>

      {/* 🔹 Service Detail */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          
          {/* ✅ UPDATED GALLERY */}
          <ServiceGallery
            images={galleryImages.map((img) => img.image_url)}
            title={service.title}
          />

          {/* 🔹 Content */}
          <div>
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
                href={`https://wa.me/919876543210?text=I am interested in ${encodeURIComponent(
                  service.title
                )}`}
                target="_blank"
                className="px-6 py-3 bg-green-500 hover:bg-green-600 transition text-white rounded-full font-semibold shadow-md flex items-center gap-2"
              >
                WhatsApp Enquiry
              </a>

              <ShareWidget title={service.title} />
            </div>
          </div>
        </div>
      </section>

      {/* 🔹 Divider */}
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
