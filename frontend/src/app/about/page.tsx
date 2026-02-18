"use client";

import {
  ShieldCheck,
  Banknote,
  Link as LinkIcon,
  FileCheck,
  CheckCircle,
  Star,
  Zap,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";


/* -------------------- SERVICES -------------------- */
const services = [
  {
    title: "Insurance Services",
    icon: ShieldCheck,
    description:
      "Insurance services provide financial protection against risks like health issues, accidents, property damage, and business losses.",
  },
  {
    title: "Loan Services",
    icon: Banknote,
    description:
      "Loan services offer financial support for personal and business needs with flexible repayment options.",
  },
  {
    title: "Setu Services",
    icon: LinkIcon,
    description:
      "Setu services bridge businesses with digital financial solutions using secure APIs.",
  },
  {
    title: "Online E-Registration",
    icon: FileCheck,
    description:
      "Digitally created and signed agreements with doorstep service availability.",
  },
];

/* -------------------- BRANDS -------------------- */
const brands = [
  "/hdfc.png",
  "/icici.png",
  "/sbi.png",
  "/lic.png",
  "/reliance.png",
];

/* -------------------- TYPES -------------------- */
type Blog = {
  id: number;
  title: string;
  slug: string;  
  description: string;
  image: string;
  created_at: string;
}; 
/* -------------------- BRAND STATS DATA -------------------- */
const statsData = [
  {
    label: "Years of Experience",
    suffix: "+",
    icon: ShieldCheck,
  },
  {
    label: "Expert Team Members",
    suffix: "+",
    icon: CheckCircle,
  },
  {
    label: "Happy Clients",
    suffix: "+",
    icon: Star,
  },
  {
    label: "Projects Completed",
    suffix: "+",
    icon: Zap,
  },
];


/* ================================================= */
/* ================= ABOUT PAGE =================== */
/* ================================================= */

export default function AboutPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loadingBlogs, setLoadingBlogs] = useState(true);
   const [brandCounters, setBrandCounters] = useState({ years: 0, team: 0, clients: 0, projects: 0 });
   const [hasAnimatedBrands, setHasAnimatedBrands] = useState(false);
   const [hasAnimated, setHasAnimated] = useState(false);
  const [counters, setCounters] = useState({
    customer: 0,
    product: 0,
    efficiency: 0,
  });

  /* -------------------- FETCH BLOGS -------------------- */
 useEffect(() => {
  const fetchBlogs = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/blogs`,
        { cache: "no-store" }
      );

      if (!res.ok) throw new Error("Failed to fetch blogs");

      const data: Blog[] = await res.json();
      setBlogs(data);
    } catch (error) {
      console.error("❌ Failed to fetch blogs", error);
    } finally {
      setLoadingBlogs(false);
    }
  };

  fetchBlogs();
}, []);


  /* -------------------- COUNTER ANIMATION -------------------- */
  useEffect(() => {
    let customer = 0;
    let product = 0;
    let efficiency = 0;

    const interval = setInterval(() => {
      customer = Math.min(customer + 2, 100);
      product = Math.min(product + 2, 100);
      efficiency = Math.min(efficiency + 2, 100);
      setCounters({ customer, product, efficiency });

      if (customer === 100 && product === 100 && efficiency === 100) {
        clearInterval(interval);
      }
    }, 20);

    return () => clearInterval(interval);
  }, []); 

  /* -------------------- BRAND COUNTERS (ON SCROLL) -------------------- */
useEffect(() => {
  const handleScroll = () => {
    const brandsSection = document.getElementById("brands-section");

    if (!brandsSection || hasAnimatedBrands) return;

    const rect = brandsSection.getBoundingClientRect();

    if (rect.top < window.innerHeight * 0.8) {
      setHasAnimatedBrands(true);

      let years = 0;
      let team = 0;
      let clients = 0;
      let projects = 0;

      const targetYears = 20;
      const targetTeam = 10;
      const targetClients = 2450;
      const targetProjects = 1000;

      const interval = setInterval(() => {
        years = Math.min(years + 1, targetYears);
        team = Math.min(team + 1, targetTeam);
        clients = Math.min(
          clients + Math.floor(targetClients / 100),
          targetClients
        );
        projects = Math.min(
          projects + Math.floor(targetProjects / 100),
          targetProjects
        );

        setBrandCounters({ years, team, clients, projects });

        if (
          years === targetYears &&
          team === targetTeam &&
          clients === targetClients &&
          projects === targetProjects
        ) {
          clearInterval(interval);
        }
      }, 30);
    }
  };

  window.addEventListener("scroll", handleScroll);
  handleScroll(); // run once on load

  return () => window.removeEventListener("scroll", handleScroll);
}, [hasAnimatedBrands]);

  return (
    <main className="bg-white">
      {/* -------------------- ABOUT -------------------- */}
     <section className="py-12 md:py-20 max-w-7xl mx-auto px-4 sm:px-6">
  {/* Top Title */}
  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 py-4 md:py-6 text-black">
    About Us
  </h1>

  {/* IMAGE + DESCRIPTION LAYOUT */}
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start mb-12 md:mb-16">
    
    {/* LEFT CONTENT */}
    <div>
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-4 md:mb-6">
        Shree Multiservices
      </h2>

      <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3 md:mb-4">
        We, Aaple Sarkar at Nawathe in Amravati, Maharashtra, are a corporate
        consulting company managed by specialised team of consultants committed
        to provide quality experience to our clients in the widest spectrum of
        company registration services.
      </p>

      <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3 md:mb-4">
        Our diversified team with extensive legal, financial and corporate
        knowledge enable us to cater to the stated and unstated needs of our
        clients. Our aim is to provide best service to all our clients.
      </p>

      <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
        We are passionate about making a measurable impact in all we do.
      </p>
    </div>

    {/* RIGHT IMAGE */}
    <div className="w-full">
      <img
        src="/aboutus.png"  
        alt="Shree Multiservices Office"
        className="w-full h-[250px] sm:h-[300px] md:h-[400px] rounded-xl md:rounded-2xl shadow-lg object-cover"
      />
    </div>
  </div>

  {/* COUNTERS SECTION — UNCHANGED */}
  <div className="grid grid-cols-3 gap-3 sm:gap-6 text-center border-t pt-6 md:pt-8">
    <div>
      <Star className="mx-auto text-blue-500 h-5 w-5 sm:h-6 sm:w-6" />
      <div className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-600">
        {counters.customer}%
      </div>
      <p className="text-xs sm:text-sm text-gray-600">Customer Satisfaction</p>
    </div>

    <div>
      <CheckCircle className="mx-auto text-green-500 h-5 w-5 sm:h-6 sm:w-6" />
      <div className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-600">
        {counters.product}%
      </div>
      <p className="text-xs sm:text-sm text-gray-600">Product Availability</p>
    </div>

    <div>
      <Zap className="mx-auto text-yellow-500 h-5 w-5 sm:h-6 sm:w-6" />
      <div className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-600">
        {counters.efficiency}%
      </div>
      <p className="text-xs sm:text-sm text-gray-600">Work Efficiency</p>
    </div>
  </div>
</section> 

{/* ================= OUR SERVICES ================= */}
<section className="py-16 md:py-24 bg-slate-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6">
    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-10 md:mb-14 text-slate-900">
      OUR SERVICES
    </h2>

    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-8">
      
      {/* Insurance Services */}
      <a
        href="/categories/insurance-services"
        className="group bg-white rounded-xl md:rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1"
      >
        <div className="h-28 sm:h-32 md:h-44 overflow-hidden">
          <img
            src="/insurance.jpg"
            alt="Insurance Services"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="p-3 sm:p-4 md:p-6">
          <h3 className="text-xs sm:text-sm md:text-lg font-bold text-slate-900 mb-1 sm:mb-2 md:mb-3 group-hover:text-blue-600 line-clamp-2">
            Insurance Services
          </h3>
          <p className="text-[10px] sm:text-xs md:text-sm text-gray-600 leading-relaxed line-clamp-3 md:line-clamp-none">
            Financial protection against health risks, accidents, property
            damage, and business losses.
          </p>
        </div>
      </a>

      {/* Loan Services */}
      <a
        href="/categories/loan-services"
        className="group bg-white rounded-xl md:rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1"
      >
        <div className="h-28 sm:h-32 md:h-44 overflow-hidden">
          <img
            src="/loan.jpg"
            alt="Loan Services"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="p-3 sm:p-4 md:p-6">
          <h3 className="text-xs sm:text-sm md:text-lg font-bold text-slate-900 mb-1 sm:mb-2 md:mb-3 group-hover:text-blue-600 line-clamp-2">
            Loan Services
          </h3>
          <p className="text-[10px] sm:text-xs md:text-sm text-gray-600 leading-relaxed line-clamp-3 md:line-clamp-none">
            Personal and business loans with flexible repayment options and
            fast approvals.
          </p>
        </div>
      </a>

      {/* Setu Services */}
      <a
        href="/categories/setu-services"
        className="group bg-white rounded-xl md:rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1"
      >
        <div className="h-28 sm:h-32 md:h-44 overflow-hidden">
          <img
            src="/setu.jpg"
            alt="Setu Services"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="p-3 sm:p-4 md:p-6">
          <h3 className="text-xs sm:text-sm md:text-lg font-bold text-slate-900 mb-1 sm:mb-2 md:mb-3 group-hover:text-blue-600 line-clamp-2">
            Setu Services
          </h3>
          <p className="text-[10px] sm:text-xs md:text-sm text-gray-600 leading-relaxed line-clamp-3 md:line-clamp-none">
            Digital financial services including APIs for payments, banking,
            lending, and insurance.
          </p>
        </div>
      </a>

      {/* Online Rent Agreement */}
      <a
        href="/categories/online-rent-agreement"
        className="group bg-white rounded-xl md:rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1"
      >
        <div className="h-28 sm:h-32 md:h-44 overflow-hidden">
          <img
            src="/rent-agreement.jpg"
            alt="Online Rent Agreement"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="p-3 sm:p-4 md:p-6">
          <h3 className="text-xs sm:text-sm md:text-lg font-bold text-slate-900 mb-1 sm:mb-2 md:mb-3 group-hover:text-blue-600 line-clamp-2">
            Online Rent Agreement
          </h3>
          <p className="text-[10px] sm:text-xs md:text-sm text-gray-600 leading-relaxed line-clamp-3 md:line-clamp-none">
            Digitally created and legally valid rental agreements with doorstep
            service availability.
          </p>
        </div>
      </a>

    </div>
  </div>
</section>

 {/* Brands Section with Stats and Icons */}
      <section id="brands-section" className="py-12 sm:py-16 md:py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-2 md:mb-4 text-black">OUR BRANDS</h2>
          <p className="text-gray-600 text-center text-xs sm:text-sm md:text-base mb-6 md:mb-8">Partnered with leading financial institutions</p>
          
          {/* Updated Brand Logos with white background, shadows, and hover effects */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-8 items-center mb-10 md:mb-16">
            {brands.map((brand) => (
              <div 
                key={brand}
                className="group relative w-[45%] sm:w-auto"
              >
                <div className="bg-white p-3 sm:p-4 md:p-6 rounded-lg md:rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 group-hover:border-blue-200 group-hover:-translate-y-1">
                  <div className="relative w-16 h-8 sm:w-20 sm:h-10 md:w-24 md:h-12 lg:w-32 lg:h-16 flex items-center justify-center">
                    <Image
                      src={brand}
                      alt="Brand Logo"
                      width={96}
                      height={48}
                      className="object-contain transition-all duration-300 group-hover:scale-105"
                      sizes="(max-width: 640px) 64px, (max-width: 768px) 80px, 96px"
                    />
                  </div>
                </div>
                {/* Optional: Add a subtle glow effect on hover */}
                <div className="absolute inset-0 rounded-lg md:rounded-xl bg-blue-100 opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-300 -z-10"></div>
              </div>
            ))}
          </div>
          
          {/* Brand Stats Grid with Icons */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-8 mt-6 md:mt-12">
            {statsData.map((stat, index) => (
              <div key={index} className="text-center bg-white p-3 sm:p-4 md:p-6 lg:p-8 rounded-lg md:rounded-xl shadow hover:shadow-lg transition">
                <div className="flex flex-col sm:flex-row sm:items-center justify-center gap-1 sm:gap-2 md:gap-4 mb-1 sm:mb-2 md:mb-3">
                  <stat.icon className="text-blue-500 mx-auto sm:mx-0 h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-8 lg:w-8" />
                  <div className="text-base sm:text-lg md:text-2xl lg:text-4xl font-bold text-blue-600">
                    {index === 0 && brandCounters.years}
                    {index === 1 && brandCounters.team}
                    {index === 2 && brandCounters.clients.toLocaleString()}
                    {index === 3 && brandCounters.projects.toLocaleString()}
                    <span className="text-blue-400">{stat.suffix}</span>
                  </div>
                </div>
                <div className="text-gray-600 font-medium text-[10px] sm:text-xs md:text-sm lg:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------- LATEST UPDATES (DB) -------------------- */}
      <section className="py-16 md:py-24 bg-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6">
    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-10 md:mb-16 tracking-tight text-slate-900">
      Latest Updates
    </h2>

    {loadingBlogs ? (
      <div className="flex justify-center items-center h-48 md:h-64">
        <p className="text-gray-400 animate-pulse text-sm md:text-base">Loading updates...</p>
      </div>
    ) : blogs.length === 0 ? (
      <p className="text-center text-gray-500 py-8 md:py-12 text-sm md:text-base">No updates available at the moment.</p>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
        {blogs.slice(0, 3).map((blog) => {
         const imageSrc = blog.image
  ? blog.image.startsWith("/")
    ? blog.image
    : `/${blog.image}`
  : "/blogs/default.jpg";

          return (
            <div
              key={blog.id}
              className="group flex flex-col bg-white rounded-xl md:rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              {/* Image Container */}
              <div className="relative h-48 sm:h-52 md:h-60 w-full overflow-hidden">
                <Image
                  src={imageSrc}
                  alt={blog.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

             {/* Content */}
<div className="p-5 md:p-8 flex flex-col flex-grow">
  <h3 className="text-base sm:text-lg md:text-xl font-bold mb-1 md:mb-2 text-slate-900 leading-snug group-hover:text-blue-600 transition-colors">
    {blog.title}
  </h3>

  {/* Date below title */}
  {blog.created_at && (
    <p className="text-[10px] sm:text-xs text-gray-400 mb-2 md:mb-3">
      Published on{" "}
      {new Date(blog.created_at).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })}
    </p>
  )}

  <p className="text-gray-500 text-xs sm:text-sm leading-relaxed line-clamp-3 mb-4 md:mb-6">
    {blog.description}
  </p>

  {/* Bottom Action */}
<div className="mt-auto pt-2 md:pt-4">
  {blog.slug ? (
    <Link
      href={`/about/${blog.slug}`}
      className="inline-flex items-center text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors"
    >
      Read More
      <svg
        className="w-3 h-3 sm:w-4 sm:h-4 ml-1"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M17 8l4 4m0 0l-4 4m4-4H3"
        />
      </svg>
    </Link>
  ) : (
    <span className="text-[10px] sm:text-xs text-gray-400">
      Blog link unavailable
    </span>
  )}
</div>

             </div>
            </div>
          );
        })}
      </div>
    )}
  </div>
</section>
    </main>
  );
}