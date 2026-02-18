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
    <div className="relative pb-4 mb-6 md:pb-6 md:mb-8">
      {/* Animated gradient line at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent" />
      <div className="absolute bottom-0 left-0 h-px w-20 md:w-24 bg-gradient-to-r from-blue-500 to-blue-300 rounded-full animate-[shimmer_3s_ease-in-out_infinite]" />
      
      <div className="flex items-center justify-between gap-4">
        {/* Premium Title Section */}
        <div className="group relative min-w-0"> {/* min-w-0 allows title truncation/wrapping if needed */}
          {/* Animated gradient background on hover */}
          <div className="absolute -inset-4 -z-10 rounded-2xl bg-gradient-to-r from-blue-50 via-white to-blue-50 opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl" />
          
          {/* Decorative accent line with pulse animation */}
          <div className="absolute left-0 top-0 bottom-0 w-1 md:w-1.5 rounded-full bg-gradient-to-b from-blue-500 via-blue-400 to-blue-300">
            <div className="absolute inset-0 rounded-full bg-blue-400 animate-pulse opacity-70" />
          </div>
          
          <div className="pl-4 md:pl-6">
            {/* Main title with responsive sizing and wrapping prevention */}
            <h3 className="text-lg md:text-2xl font-bold text-gray-900 tracking-tight bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text line-clamp-1 md:line-clamp-none">
              {title}
            </h3>
          </div>
        </div>

        {/* Simple View All Button - shrink-0 ensures it never squashes */}
        <Link
          href={`/categories/${slug}`}
          className="flex items-center gap-1 md:gap-2 text-blue-600 font-semibold shrink-0 text-sm md:text-base hover:text-blue-700 transition-colors" 
        >
          <span className="whitespace-nowrap">View all</span>
          <ArrowRight size={16} className="md:w-[18px] md:h-[18px]" />
        </Link>
      </div>
    </div>
  );
}