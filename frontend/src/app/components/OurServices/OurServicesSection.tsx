import { getCategories } from "@/app/services/category.service";
import { getServicesByCategory } from "@/app/services/service.service";
import CategoryBlock from "./CategoryBlock";
import ServiceSlider from "./ServiceSlider";

interface Category {
  id: number;
  title: string;
  slug: string;
}

export default async function OurServices() {
  const categories: Category[] = await getCategories();

  if (!categories || categories.length === 0) {
    return null;
  }

  // 🔥 Fetch all category services in parallel (performance boost)
  const servicesMap = await Promise.all(
    categories.map(async (category) => ({
      slug: category.slug,
      services: await getServicesByCategory(category.slug),
    }))
  );

  const servicesBySlug = Object.fromEntries(
    servicesMap.map((item) => [item.slug, item.services])
  );

  return (
    <section className="relative py-16 md:py-20 bg-white">
      {/* Decorative Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-100/30 blur-3xl rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold tracking-wide uppercase mb-4">
            What We Offer
          </span>

          <h2 className="text-2xl md:text-4xl font-bold text-slate-900 tracking-tight mb-4">
            Our Premium Services
          </h2>

          <p className="text-lg text-slate-600 leading-relaxed">
            Explore our comprehensive range of solutions designed to simplify your Personal, Professional and Business needs.
          </p>
        </div>

        <div className="space-y-16">
          {categories.map((category) => {
            const services = servicesBySlug[category.slug];

            return (
              <div key={category.id} className="relative">
                <div className="mb-10">
                  <CategoryBlock
                    title={category.title}
                    slug={category.slug}
                  />
                </div>

                {services && services.length > 0 ? (
                  <ServiceSlider services={services} />
                ) : (
                  <div className="mt-6 p-8 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50 text-center">
                    <p className="text-slate-500 font-medium">
                      Services for {category.title} are coming soon.
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}