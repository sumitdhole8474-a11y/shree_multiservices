"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Customer Support", path: "/customer-support" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      {/* HEADER: inset-x-0 and w-full forces it to span exactly the screen width */}
      <header className="fixed top-0 inset-x-0 z-[100] w-full bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex h-20 items-center justify-between gap-2">

            {/* LOGO: shrink and min-w-0 prevents it from pushing the menu icon off-screen */}
            <Link
              href="/"
              className="flex items-center gap-2 shrink min-w-0"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div className="shrink-0">
                <Image
                  src="/logo.png"
                  alt="Logo"
                  width={55}
                  height={55}
                  className="w-auto h-12 sm:h-15"
                  priority
                />
              </div>
              <span className="text-lg sm:text-xl font-bold text-slate-900 truncate">
                Shree Multiservices
              </span>
            </Link>

            {/* DESKTOP NAV */}
            <nav className="hidden md:flex items-center gap-8 shrink-0">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`text-[15px] font-bold ${
                    pathname === item.path ? "text-blue-600" : "text-slate-600"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* MOBILE BUTTON: shrink-0 is vital to keep the 3-bars visible */}
            <button
              className="md:hidden p-2 shrink-0 text-slate-700 bg-slate-50 rounded-lg"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={28} />
            </button>

          </div>
        </div>
      </header>

      {/* MOBILE OVERLAY */}
      <div
        className={`fixed inset-0 z-[110] bg-slate-900/60 backdrop-blur-sm md:hidden transition-opacity ${
          isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* MOBILE DRAWER */}
      <div
        className={`fixed top-0 right-0 z-[120] h-full w-[280px] bg-white shadow-2xl transform transition-transform duration-300 md:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-6 border-b">
          <span className="font-bold text-slate-900">Menu</span>
          <button onClick={() => setIsMobileMenuOpen(false)} className="p-2">
            <X size={26} />
          </button>
        </div>
        <nav className="p-6 flex flex-col gap-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block px-5 py-4 rounded-2xl text-base font-bold ${
                pathname === item.path ? "bg-blue-50 text-blue-600" : "text-slate-700"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}