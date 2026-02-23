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
  const [showRight, setShowRight] = useState(false);

  const checkScroll = () => {
    const container = sliderRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;

    setShowLeft(scrollLeft > 0);
    setShowRight(scrollLeft + clientWidth < scrollWidth - 5);
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [services]);

  const scroll = (direction: "left" | "right") => {
    const container = sliderRef.current;
    if (!container) return;

    const scrollAmount = container.clientWidth;

    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative select-none w-full px-1 sm:px-0">
      {/* Left Arrow */}
      {showLeft && (
        <button
          onClick={() => scroll("left")}
          className="absolute -left-16 xl:-left-20 top-1/2 -translate-y-1/2 z-30 bg-white border border-slate-200 text-slate-700 p-3 rounded-full shadow-lg hover:bg-blue-50 hover:text-blue-600 transition hidden lg:flex"
          aria-label="Scroll Left"
        >
          <ChevronLeft size={24} />
        </button>
      )}

      {/* Right Arrow */}
      {showRight && (
        <button
          onClick={() => scroll("right")}
          className="absolute -right-16 xl:-right-20 top-1/2 -translate-y-1/2 z-30 bg-white border border-slate-200 text-slate-700 p-3 rounded-full shadow-lg hover:bg-blue-50 hover:text-blue-600 transition hidden lg:flex"
          aria-label="Scroll Right"
        >
          <ChevronRight size={24} />
        </button>
      )}

      {/* Slider Container */}
      <div
        ref={sliderRef}
        onScroll={checkScroll}
        className="
          grid grid-flow-col gap-4 sm:gap-6
          overflow-x-auto
          pb-10 pt-4
          scroll-smooth hide-scrollbar
          snap-x snap-mandatory
          auto-cols-[calc((100%-1rem)/2)]
          sm:auto-cols-[calc((100%-1.5rem)/2)]
          lg:auto-cols-[calc((100%-4.5rem)/4)]
          xl:auto-cols-[calc((100%-6rem)/5)]
        "
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {services.map((service) => (
          <div key={service.id} className="snap-start h-full">
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