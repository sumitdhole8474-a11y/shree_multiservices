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

        <div className="mt-6 flex justify-center">
          <WriteReviewButton />
        </div>
      </div>

      <div className="relative w-full">
        <div className="absolute left-0 top-0 bottom-0 w-12 md:w-24 z-10 bg-gradient-to-r from-gray-50 to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 md:w-24 z-10 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none" />

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

                    <div className="p-4 md:p-6 flex flex-col h-full">
                      {/* Header */}
                      <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                        <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-blue-50 flex items-center justify-center overflow-hidden border border-blue-100">
                          <User size={20} className="md:hidden text-blue-500" />
                          <User size={24} className="hidden md:block text-blue-500" />
                        </div>

                        <div>
                          <h3 className="font-semibold text-gray-900 leading-tight text-sm md:text-base">
                            {review.name}
                          </h3>
                          <p className="text-xs md:text-sm text-gray-500">
                            {formattedDate}
                          </p>
                        </div>
                      </div>

                      {/* Review Text (Middle Section) */}
                      <div className="flex-1">
                        <p className="text-gray-700 text-sm md:text-base leading-relaxed line-clamp-4 md:line-clamp-none">
                          {review.review}
                        </p>
                      </div>

                      {/* Bottom Section */}
                      <div className="flex items-center gap-3 mt-4">
                        {/* Google G SVG */}
                        <svg
                          width="20"
                          height="20"
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

                        {/* Smaller Star Rating */}
                        <div className="flex gap-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              size={13}
                              className={
                                i < review.rating
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-gray-300"
                              }
                            />
                          ))}
                        </div>
                      </div>

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