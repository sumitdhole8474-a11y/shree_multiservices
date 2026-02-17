import { getCategories } from "@/app/services/category.service";
import { getServicesByCategory } from "@/app/services/service.service";
import CategoryBlock from "./CategoryBlock";
import ServiceSlider from "./ServiceSlider"; // Import the new client component
import Link from "next/link";

export default async function OurServices() {
  const categories = await getCategories();

  return (
    // THEME UPDATE: Added soft background and better vertical padding
    <section className="relative py-24 bg-white">
      {/* THEME UPDATE: Decorative background element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-100/30 blur-3xl rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* THEME UPDATE: Professional Center Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold tracking-wide uppercase mb-4">
            What We Offer
          </span>
          <h2 className="text-2xl md:text-4xl font-bold text-slate-900 tracking-tight mb-4">
            Our Premium Services
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            Explore our comprehensive range of solutions designed to simplify your business needs.
          </p>
        </div>

        {/* LOGIC: Mapping categories */}
        <div className="space-y-24">
          {categories.map((category: any) => (
            <CategorySection
              key={category.id}
              title={category.title}
              slug={category.slug}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------- */
/* Separate async component per category */
/* --------------------------------------------- */
async function CategorySection({
  title,
  slug,
}: {
  title: string;
  slug: string;
}) {
  console.log(`Fetching services for category: ${title} (Slug: ${slug})`);
  const services = await getServicesByCategory(slug);

  return (
    <div className="relative">
      {/* THEME UPDATE: Better spacing for the heading */}
      <div className="mb-10">
        <CategoryBlock title={title} slug={slug} />
      </div>

      {services.length > 0 ? (
        <>
          {/* ✅ UPDATED: Logic moved to ServiceSlider to handle arrows and scrolling
              We pass the full list of services now, not just the first 5. 
          */}
          <ServiceSlider services={services} />
        </>
      ) : (
        /* THEME UPDATE: Professional Empty State Box */
        <div className="mt-6 p-8 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50 text-center">
          <p className="text-slate-500 font-medium">
            Services for {title} are coming soon.
          </p>
        </div>
      )}
    </div>
  );
}