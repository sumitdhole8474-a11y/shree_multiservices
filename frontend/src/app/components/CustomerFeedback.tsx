import { getReviews } from "@/app/services/review.service";
import { Star, User } from "lucide-react";

export default async function CustomerFeedback() {
  const reviews = await getReviews();

  if (!Array.isArray(reviews) || reviews.length === 0) return null;

  return (
    <section className="py-24 bg-gray-50 overflow-hidden">
      {/* Section Heading */}
      <div className="container mx-auto px-4 mb-16 text-center">
        <span className="text-blue-600 font-semibold tracking-wider text-sm uppercase">
          Testimonials
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
          What our customers are saying
        </h2>
      </div>

      <div className="relative w-full">
        {/* Left Gradient */}
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-gray-50 to-transparent pointer-events-none" />
        {/* Right Gradient */}
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none" />

        {/* Marquee Wrapper - Added 'group' here */}
        <div className="flex overflow-hidden group">
          {[0, 1].map((setIndex) => (
            <div
              key={setIndex}
              // Added 'group-hover:[animation-play-state:paused]' here
              className="flex animate-marquee py-6 group-hover:[animation-play-state:paused]"
              aria-hidden={setIndex === 1}
            >
              {[...reviews, ...reviews].map((review: any, index: number) => (
                <div
                  key={`${setIndex}-${index}`}
                  className="mx-4 min-w-[360px] max-w-[360px] bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
                >
                  {/* Top Accent */}
                  <div className="h-2 bg-blue-500" />

                  <div className="p-6">
                    {/* Header */}
                    <div className="flex items-center gap-4 mb-4">
                      {/* Avatar Icon */}
                      <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center overflow-hidden border border-blue-100">
                        <User size={24} className="text-blue-500" />
                      </div>

                      {/* Name + Rating */}
                      <div>
                        <h3 className="font-semibold text-gray-900 leading-tight">
                          {review.name}
                        </h3>

                        <div className="flex gap-1 mt-1">
                          {Array.from({ length: review.rating }).map((_, i) => (
                            <Star
                              key={i}
                              size={16}
                              className="text-yellow-400 fill-yellow-400"
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Date */}
                    <p className="text-sm text-gray-500 mb-3">
                      {new Date(review.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>

                    {/* Review Text */}
                    <p className="text-gray-700 text-base leading-relaxed">
                      {review.review}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}