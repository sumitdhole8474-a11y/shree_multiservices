"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-600">

          {/* Left: Copyright */}
          <p className="text-center md:text-left">
            © 2026 <span className=" text-slate-900">Shree Multiservices Pvt. Ltd.</span> All rights reserved.
          </p>

          {/* Center: Legal Links */}
          <div className="flex items-center gap-6">
            <Link
              href="/privacy-policy"
              className="hover:text-slate-900 transition"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-slate-900 transition"
            >
              Terms of Service
            </Link>
            <Link
              href="/contact"
              className="hover:text-slate-900 transition"
            >
              Contact Us
            </Link>
          </div>

          {/* Right: Developed By */}
  
<div className="flex items-center gap-2">
  <span className="text-slate-500">Developed by</span>
  
  {/* Link Wrapper */}
  <Link 
    href="https://bizonance.in/" 
    target="_blank" 
    rel="noopener noreferrer"
    className="hover:opacity-80 transition-opacity" // Optional: Adds a hover effect
  >
    <Image
      src="/bizonancelogo.png"
      alt="Bizonance"
      width={120}
      height={28}
      className="object-contain"
    />
  </Link>
</div>

        </div>
      </div>
    </footer>
  );
}
