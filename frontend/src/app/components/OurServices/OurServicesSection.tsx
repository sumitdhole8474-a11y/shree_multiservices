"use client";

import { useEffect, useState } from "react";
import { getCategories } from "@/app/services/category.service";
import { getServicesByCategory } from "@/app/services/service.service";
import CategoryBlock from "./CategoryBlock";
import ServiceSlider from "./ServiceSlider";
import { Search } from "lucide-react";

interface Category {
  id: number;
  title: string;
  slug: string;
}

export default function OurServices() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [servicesBySlug, setServicesBySlug] = useState<any>({});
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  /* ===============================
     FETCH DATA
  =============================== */
  useEffect(() => {
    const loadData = async () => {
      const cats: Category[] = await getCategories();
      setCategories(cats);

      const servicesMap = await Promise.all(
        cats.map(async (category) => ({
          slug: category.slug,
          services: await getServicesByCategory(category.slug),
        }))
      );

      const mapped = Object.fromEntries(
        servicesMap.map((item) => [item.slug, item.services])
      );

      setServicesBySlug(mapped);
    };

    loadData();
  }, []);

  if (!categories.length) return null;

  /* ===============================
     FILTER LOGIC
  =============================== */
  const filteredCategories = categories.filter((category) => {
    if (selectedCategory !== "all" && category.slug !== selectedCategory)
      return false;

    const services = servicesBySlug[category.slug] || [];

    const categoryMatch = category.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const serviceMatch = services.some((service: any) =>
      service.title.toLowerCase().includes(search.toLowerCase())
    );

    return categoryMatch || serviceMatch;
  });

  return (
    <section className="relative py-16 md:py-20 bg-white">
      {/* Decorative Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-100/30 blur-3xl rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">

        {/* ================= HEADER ================= */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-10">
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

        {/* ================= SEARCH + FILTER ================= */}
        <div className="flex flex-col md:flex-row gap-4 mb-12 justify-center items-center">

          {/* SEARCH */}
          <div className="relative w-full md:w-96">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search services or categories..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          {/* CATEGORY FILTER */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          >
            <option value="all">All Categories</option>

            {categories.map((category) => (
              <option key={category.id} value={category.slug}>
                {category.title}
              </option>
            ))}
          </select>
        </div>

        {/* ================= SERVICES ================= */}
        <div className="space-y-16">
          {filteredCategories.map((category) => {
            const services = servicesBySlug[category.slug];

            const filteredServices =
              services?.filter((service: any) =>
                service.title
                  .toLowerCase()
                  .includes(search.toLowerCase())
              ) || [];

            return (
              <div key={category.id} className="relative">
                <div className="mb-10">
                  <CategoryBlock
                    title={category.title}
                    slug={category.slug}
                  />
                </div>

                {filteredServices.length > 0 ? (
                  <ServiceSlider services={filteredServices} />
                ) : (
                  <div className="mt-6 p-8 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50 text-center">
                    <p className="text-slate-500 font-medium">
                      No services found.
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