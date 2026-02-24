"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const images = ["/hero1.png", "/hero2.png", "/hero3.png"];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full flex items-center bg-gradient-to-br from-yellow-50 to-white overflow-hidden pt-16 pb-10 md:pt-28 md:pb-20">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-start">

        {/* IMAGE */}
        <div className="order-1 md:order-2 relative w-full h-[260px] sm:h-[320px] md:h-[420px] rounded-3xl overflow-hidden shadow-2xl">
          {images.map((img, index) => (
            <div
              key={img}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                index === current
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-105"
              }`}
            >
              <Image
                src={img}
                alt="Service Image"
                fill
                className="object-cover"
                priority={index === 0}
              />
            </div>
          ))}
        </div>

        {/* CONTENT */}
        <div className="order-2 md:order-1 space-y-5 animate-fade-in-up">

          <h1 className="text-2xl md:text-4xl font-bold text-gray-900 leading-tight">
            Your Trusted Partner for All
            <br />
            <span className="text-yellow-500">Documentation Services</span>
          </h1>

          <p className="text-gray-600 text-base md:text-lg max-w-xl leading-relaxed">
            We specialize in providing reliable and efficient solutions for all your government documentation needs.
            From permits and licenses to official certifications, our agency ensures smooth processing with accuracy and professionalism.
            Our goal is to simplify administrative procedures, making government services accessible and hassle-free for everyone.
          </p>

          {/* BUTTONS */}
          <div className="flex gap-3 flex-nowrap">
            <Link href="/customer-support">
              <button className="flex items-center gap-2 px-5 py-3 bg-blue-600 text-white rounded-full hover:scale-105 transition whitespace-nowrap">
                Get Customer Help
                <ArrowRight size={18} />
              </button>
            </Link>

            {/* GOOGLE REVIEW BUTTON */}
            <a
              href="https://g.page/r/CVopq8vfr-Y6EBM/review"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-6 py-3 bg-white text-black rounded-full shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 whitespace-nowrap border border-gray-200"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.54 0 6.71 1.22 9.2 3.6l6.9-6.9C35.5 2.4 30.2 0 24 0 14.7 0 6.7 5.5 2.8 13.5l8.1 6.3C13 13 18 9.5 24 9.5z"
                />
                <path
                  fill="#4285F4"
                  d="M46.1 24.5c0-1.7-.1-3.3-.4-4.8H24v9.1h12.4c-.5 2.7-2 5-4.2 6.6l6.5 5C42.8 36.5 46.1 31 46.1 24.5z"
                />
                <path
                  fill="#FBBC05"
                  d="M10.9 28.8c-.5-1.4-.8-2.9-.8-4.3s.3-2.9.8-4.3l-8.1-6.3C1 17.3 0 20.6 0 24s1 6.7 2.8 10.1l8.1-6.3z"
                />
                <path
                  fill="#34A853"
                  d="M24 48c6.5 0 12-2.1 16-5.7l-6.5-5c-2 1.4-4.6 2.2-9.5 2.2-6 0-11-3.5-13.1-8.5l-8.1 6.3C6.7 42.5 14.7 48 24 48z"
                />
              </svg>

              Write a Review
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}