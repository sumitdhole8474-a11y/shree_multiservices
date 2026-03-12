"use client";

export default function WriteReviewButton() {
  return (
    <a
      href="https://g.page/r/CQ1Z84RjARMIEBE/review"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-3 px-6 py-3 bg-white text-black rounded-full font-semibold shadow-md border border-gray-200 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
    >
      {/* Google G SVG */}
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
  );
}