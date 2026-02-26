import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CategoryBlock({
  title,
  slug,
}: {
  title: string;
  slug: string;
}) {
  return (
    <div className="relative pb-5 mb-8 group">
      {/* Subtle animated bottom divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent" />

      <div className="absolute bottom-0 left-0 h-[2px] w-24 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full transition-all duration-500 group-hover:w-40" />

      <div className="flex items-center justify-between gap-4">
        {/* Title Section */}
        <div className="relative min-w-0">
          {/* Soft glow on hover */}
          <div className="absolute -inset-4 -z-10 rounded-2xl bg-gradient-to-r from-blue-50 via-white to-blue-50 opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl" />

          {/* Left accent bar */}
          <div className="absolute left-0 top-0 bottom-0 w-1.5 rounded-full bg-gradient-to-b from-blue-600 via-blue-500 to-blue-400 transition-all duration-300 group-hover:scale-y-110" />

          <div className="pl-5 md:pl-6">
            <h3 className="text-lg md:text-2xl font-bold tracking-tight text-gray-900 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text transition-all duration-300 group-hover:tracking-wide line-clamp-1 md:line-clamp-none">
              {title}
            </h3>
          </div>
        </div>

        {/* View All Button */}
        <Link
          href={`/categories/${slug}`}
          className="flex items-center gap-2 text-blue-600 font-semibold text-sm md:text-base shrink-0 transition-all duration-300 hover:text-blue-700 active:scale-95"
        >
          <span className="whitespace-nowrap relative">
            View all
            <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-blue-600 transition-all duration-300 group-hover:w-full" />
          </span>

          <ArrowRight
            size={18}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>
      </div>
    </div>
  );
}