import { getServicesByCategory } from "@/app/services/service.service";
import { getCategories } from "@/app/services/category.service";
import ServiceCard from "@/app/components/OurServices/ServiceCard";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

/* =========================================================
   SEO METADATA FOR CATEGORY PAGE
========================================================= */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const categories = await getCategories();
  const category = categories.find((c: any) => c.slug === slug);

  if (!category) {
    return {
      title: "Category Not Found | Shree Multiservices",
    };
  }

  const categoryName = category.title || "Professional Services";

  const title = `Best ${categoryName} in Amaravati | Shree Multiservices`;

  const description = `Looking for the best ${categoryName} in Amaravati? Shree Multiservices provides trusted and professional solutions tailored to your needs.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://shreemultiservices.com/categories/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://shreemultiservices.com/categories/${slug}`,
      siteName: "Shree Multiservices",
      locale: "en_IN",
      type: "website",
    },
    keywords: [
      `${categoryName} in Amaravati`,
      `Best ${categoryName}`,
      "Shree Multiservices Amaravati",
      "Professional services in Amaravati",
    ],
  };
}

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
   <section className="relative min-h-screen bg-slate-50 py-16 md:py-24">
  {/* Decorative Background Glow */}
  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] md:h-[500px] bg-blue-100/50 blur-[100px] rounded-full pointer-events-none -z-10" />

  <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
    
    {/* 🔹 Header */}
    <div className="text-center max-w-3xl mx-auto mb-10 md:mb-20">
      <h1 className="inline-block text-xl md:text-3xl font-bold text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-full px-5 md:px-6 py-2 tracking-tight shadow-xl ">
        {category.title}
      </h1>
    </div>

    {/* 🔹 Services Grid */}
    {services.length > 0 ? (
      <div
        className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4  md:gap-6 lg:gap-8 place-items-center ">
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
      <div className="flex flex-col items-center justify-center py-14 md:py-24 border-2 border-dashed border-slate-200 rounded-3xl bg-white/50 text-center">
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
