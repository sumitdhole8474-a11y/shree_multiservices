import {
  getServiceDetail,
  getServicesByCategory,
} from "@/app/services/service.service";
import ServiceSlider from "@/app/components/OurServices/ServiceSlider";
import ShareWidget from "@/app/components/ShareWidget"; 
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;

  const service = await getServiceDetail(slug);

  if (!service) {
    notFound();
  }

  const relatedServices = await getServicesByCategory(
    service.category_slug
  );

  const filteredRelated = relatedServices.filter(
    (s) => s.slug !== slug
  );

  return (
    // 🔹 FIX: Added 'min-h-screen' and 'pt-24' (padding) here. 
    // This ensures the white background covers the top area.
    <main className="bg-white min-h-screen pt-24">
      
      {/* 🔵 Category Header 
          - Removed 'mt-13' (margin) to prevent black background leak 
      */}
      <section className="w-full pb-8 flex justify-center">
        <h1 className="text-center text-3xl font-bold text-white bg-blue-600 rounded-full px-6 py-2 tracking-wide shadow-md">
          {service.category}
        </h1>
      </section>

      {/* 🔹 Service Detail */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Image */}
          <div className="relative w-full h-72 md:h-[420px] rounded-2xl overflow-hidden shadow-lg border border-gray-100">
            <Image
              src={service.image_url}
              alt={service.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Content */}
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
              {service.title}
            </h2>

            <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-wrap">
              {service.long_description ||
                service.short_description ||
                "Detailed description coming soon."}
            </p>

            {/* Actions */}
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

              {/* Share Widget */}
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