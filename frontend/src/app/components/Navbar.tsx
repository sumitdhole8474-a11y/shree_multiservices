"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronRight } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; }; // Cleanup
  }, [isMobileMenuOpen]);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Customer Support", path: "/customer-support" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-[100] w-full bg-white backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex h-16 sm:h-20 items-center justify-between gap-4">
            
            {/* LOGO SECTION */}
            <Link
              href="/"
              className="flex items-center gap-2 shrink min-w-0 group"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div className="shrink-0 transition-transform group-hover:scale-105">
                <Image
                  src="/logo.png"
                  alt="Shree Multiservices Logo"
                  width={45}
                  height={45}
                  className="w-auto h-10 sm:h-12"
                  priority
                />
              </div>
              <span className="text-base sm:text-lg font-bold text-slate-900 truncate">
                Shree Multiservices
              </span>
            </Link>

            {/* DESKTOP NAV */}
            <nav className="hidden md:flex items-center gap-6 lg:gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`text-[15px] font-semibold transition-colors hover:text-blue-600 ${
                    pathname === item.path ? "text-blue-600" : "text-slate-600"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* MOBILE TOGGLE */}
            <button
              className="md:hidden p-2 -mr-2 text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open main menu"
              aria-expanded={isMobileMenuOpen}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE OVERLAY */}
      <div
        className={`fixed inset-0 z-[110] bg-slate-900/40 backdrop-blur-sm md:hidden transition-opacity duration-300 ${
          isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* MOBILE DRAWER */}
      <aside
        className={`fixed top-0 right-0 z-[120] h-full w-[85%] max-w-[320px] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out md:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Drawer Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-50">
            <span className="font-bold text-slate-900 uppercase tracking-wider text-sm">Shree Multiservices</span>
            <button 
              onClick={() => setIsMobileMenuOpen(false)} 
              className="p-2 -mr-2 text-slate-500 hover:text-slate-900"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>

          {/* Drawer Links */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center justify-between px-4 py-4 rounded-xl text-base font-semibold transition-all ${
                  pathname === item.path 
                    ? "bg-blue-50 text-blue-600" 
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                {item.name}
                <ChevronRight size={18} className={pathname === item.path ? "opacity-100" : "opacity-0"} />
              </Link>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
}