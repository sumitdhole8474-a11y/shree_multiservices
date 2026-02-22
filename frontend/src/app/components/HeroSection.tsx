"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Star, ArrowRight } from "lucide-react";
import Link from "next/link";
import ReviewModal from "@/app/components/ReviewModal";

const images = ["/hero1.png", "/hero2.png", "/hero3.png"];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [openReview, setOpenReview] = useState(false);

  // Auto slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
<section className="relative w-full flex items-center bg-gradient-to-br from-yellow-50 to-white overflow-hidden pt-16 pb-10 md:pt-28 md:pb-20">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-start">

          {/* IMAGE — FIRST ON MOBILE, RIGHT ON DESKTOP */}
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

          {/* CONTENT — SECOND ON MOBILE, LEFT ON DESKTOP */}
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

            {/* BUTTONS — SAME LINE ON MOBILE */}
            <div className="flex gap-3 flex-nowrap">
              <Link href="/customer-support">
                <button className="flex items-center gap-2 px-5 py-3 bg-blue-600 text-white rounded-full hover:scale-105 transition whitespace-nowrap">
                  Get Customer Help
                  <ArrowRight size={18} />
                </button>
              </Link>

              <button
                onClick={() => setOpenReview(true)}
                className="flex items-center gap-2 px-5 py-3 bg-black text-white rounded-full hover:scale-105 transition whitespace-nowrap"
              >
                <Star className="text-yellow-500" size={18} />
                Write a Review
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* REVIEW MODAL */}
      <ReviewModal
        open={openReview}
        onClose={() => setOpenReview(false)}
      />
    </>
  );
}
