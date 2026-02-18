import { getServicesByCategory } from "@/app/services/service.service";
import { getCategories } from "@/app/services/category.service";
import ServiceCard from "@/app/components/OurServices/ServiceCard";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function CategoryPage({ params }: Props) {
  // ✅ MUST await params in Next.js 15+
  const { slug } = await params;

  // Fetch data in parallel
  const [services, categories] = await Promise.all([
    getServicesByCategory(slug),
    getCategories(),
  ]);

  // Find category
  const category = categories.find((c: any) => c.slug === slug);

  // If category does not exist → 404
  if (!category) {
    notFound();
  }

  return (
    <section className="relative min-h-screen bg-slate-50 py-24">
      {/* Decorative Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-blue-100/50 blur-[100px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* 🔹 Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h1 className="text-4xl md:text-4xl font-bold text-slate-900 tracking-tight mb-6">
            {category.title}
          </h1>

          {/* Decorative underline */}
          <div className="h-1.5 w-24 bg-blue-600 mx-auto rounded-full shadow-sm" />
        </div>

        {/* 🔹 Services Grid */}
        {services.length > 0 ? (
          <div className="
            grid
            grid-cols-2
            sm:grid-cols-2
            lg:grid-cols-4
            xl:grid-cols-5
            gap-6
            lg:gap-8
            place-items-center
          ">
            {services.map((service: any) => (
              <ServiceCard
                key={service.id}
                title={service.title}
                image={service.image_url}
                slug={service.slug}
              />
            ))}
          </div>
        ) : (
          /* 🔹 Empty State */
          <div className="flex flex-col items-center justify-center py-24 border-2 border-dashed border-slate-200 rounded-3xl bg-white/50 text-center">
            <div className="p-4 bg-slate-100 rounded-full mb-4">
              <span className="text-2xl">📂</span>
            </div>
            <p className="text-slate-500 text-lg font-medium">
              No services available for this category yet.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
