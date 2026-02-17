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
    <div className="relative pb-6 mb-8">
      {/* Animated gradient line at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent" />
      <div className="absolute bottom-0 left-0 h-px w-24 bg-gradient-to-r from-blue-500 to-blue-300 rounded-full animate-[shimmer_3s_ease-in-out_infinite]" />
      
      <div className="flex items-end justify-between">
        {/* Premium Title Section */}
        <div className="group relative">
          {/* Animated gradient background on hover */}
          <div className="absolute -inset-4 -z-10 rounded-2xl bg-gradient-to-r from-blue-50 via-white to-blue-50 opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl" />
          
          {/* Decorative accent line with pulse animation */}
          <div className="absolute left-0 top-0 bottom-0 w-1.5 rounded-full bg-gradient-to-b from-blue-500 via-blue-400 to-blue-300">
            <div className="absolute inset-0 rounded-full bg-blue-400 animate-pulse opacity-70" />
          </div>
          
          <div className="pl-6">
            {/* Main title with premium typography */}
            <h3 className="text-2xl md:text-2xl lg:text-2xl font-bold text-gray-900 tracking-tight bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text">
              {title}
            </h3>
          </div>
        </div>

        {/* Simple View All Button without animations */}
        <Link
          href={`/categories/${slug}`}
          className="flex items-center gap-2 text-blue-600 font-medium" >
          <span>View all</span>
          <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  );
}