import { getReviews, Review } from "@/app/services/review.service";
import { Star, User } from "lucide-react";
import WriteReviewButton from "@/app/components/WriteReviewButton";

export default async function CustomerFeedback() {
  const reviews: Review[] = await getReviews();

  if (!Array.isArray(reviews) || reviews.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-gray-50 overflow-hidden">
      {/* Section Heading */}
      <div className="container mx-auto px-4 mb-12 md:mb-16 text-center">
        <span className="text-blue-600 font-semibold tracking-wider text-xs md:text-sm uppercase">
          Testimonials
        </span>

        <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mt-2 px-4">
          What our customers are saying
        </h2>

        {/* WRITE REVIEW BUTTON */}
        <div className="mt-6 flex justify-center">
          <WriteReviewButton />
        </div>
      </div>

      <div className="relative w-full">
        {/* Left Gradient */}
        <div className="absolute left-0 top-0 bottom-0 w-12 md:w-24 z-10 bg-gradient-to-r from-gray-50 to-transparent pointer-events-none" />

        {/* Right Gradient */}
        <div className="absolute right-0 top-0 bottom-0 w-12 md:w-24 z-10 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none" />

        {/* Marquee Wrapper */}
        <div className="flex overflow-hidden group">
          {[0, 1].map((setIndex) => (
            <div
              key={setIndex}
              className="flex animate-marquee py-4 md:py-6 group-hover:[animation-play-state:paused]"
              aria-hidden={setIndex === 1}
            >
              {[...reviews, ...reviews].map((review, index) => {
                const formattedDate = review.created_at
                  ? new Date(review.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "";

                return (
                  <div
                    key={`${setIndex}-${review.id}-${index}`}
                    className="mx-3 md:mx-4 min-w-[300px] max-w-[300px] md:min-w-[360px] md:max-w-[360px] bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
                  >
                    {/* Top Accent */}
                    <div className="h-1.5 md:h-2 bg-blue-500" />

                    <div className="p-4 md:p-6">
                      {/* Header */}
                      <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                        {/* Avatar */}
                        <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-blue-50 flex items-center justify-center overflow-hidden border border-blue-100">
                          <User size={20} className="md:hidden text-blue-500" />
                          <User size={24} className="hidden md:block text-blue-500" />
                        </div>

                        {/* Name + Rating */}
                        <div>
                          <h3 className="font-semibold text-gray-900 leading-tight text-sm md:text-base">
                            {review.name}
                          </h3>

                          {/* Rating Stars (Always 5 total) */}
                          <div className="flex gap-0.5 md:gap-1 mt-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                size={14}
                                className={`md:hidden ${
                                  i < review.rating
                                    ? "text-yellow-400 fill-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={`desktop-${i}`}
                                size={16}
                                className={`hidden md:block ${
                                  i < review.rating
                                    ? "text-yellow-400 fill-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Date */}
                      <p className="text-xs md:text-sm text-gray-500 mb-2 md:mb-3">
                        {formattedDate}
                      </p>

                      {/* Review Text */}
                      <p className="text-gray-700 text-sm md:text-base leading-relaxed line-clamp-4 md:line-clamp-none">
                        {review.review}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}