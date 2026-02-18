"use client";

import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ServiceCard from "./ServiceCard";

interface ServiceSliderProps {
  services: any[];
}

export default function ServiceSlider({ services }: ServiceSliderProps) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  const checkScroll = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      setShowLeft(scrollLeft > 0);
      setShowRight(scrollLeft + clientWidth < scrollWidth - 5);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [services]);

  const scroll = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const container = sliderRef.current;
      const scrollAmount = container.clientWidth;

      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative select-none">
      {/* LEFT ARROW */}
      {showLeft && (
        <button
          onClick={() => scroll("left")}
          className="absolute -left-16 xl:-left-20 top-1/2 -translate-y-1/2 z-30 bg-white border border-slate-200 text-slate-700 p-3 rounded-full shadow-lg hover:bg-blue-50 hover:text-blue-600 transition-all duration-300 hidden lg:flex items-center justify-center outline-none"
          aria-label="Scroll Left"
        >
          <ChevronLeft size={24} />
        </button>
      )}

      {/* RIGHT ARROW */}
      {showRight && (
        <button
          onClick={() => scroll("right")}
          className="absolute -right-16 xl:-right-20 top-1/2 -translate-y-1/2 z-30 bg-white border border-slate-200 text-slate-700 p-3 rounded-full shadow-lg hover:bg-blue-50 hover:text-blue-600 transition-all duration-300 hidden lg:flex items-center justify-center outline-none"
          aria-label="Scroll Right"
        >
          <ChevronRight size={24} />
        </button>
      )}

      {/* SLIDER CONTAINER */}
      <div
        ref={sliderRef}
        onScroll={checkScroll}
        className="
          grid
          grid-flow-col
          gap-6
          overflow-x-auto
          pb-4
          pt-2
          scroll-smooth
          hide-scrollbar
          snap-x snap-mandatory
          outline-none

          /* 🔹 MOBILE: 2 cards visible */
          auto-cols-[calc((100%-1.5rem)/2)]

          /* 🔹 TABLET */
          sm:auto-cols-[calc((100%-1.5rem)/2)]

          /* 🔹 DESKTOP */
          lg:auto-cols-[calc((100%-4.5rem)/4)]
          xl:auto-cols-[calc((100%-6rem)/5)]
        "
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitTapHighlightColor: "transparent",
        }}
      >
        {services.map((service: any) => (
          <div
            key={service.id}
            className="snap-start h-full"
            style={{ WebkitTapHighlightColor: "transparent" }}
          >
            <ServiceCard
              title={service.title}
              image={service.image_url}
              slug={service.slug}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
