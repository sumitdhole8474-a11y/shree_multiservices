"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faWhatsapp, 
  faGoogle, 
  faInstagram, 
  faFacebook 
} from "@fortawesome/free-brands-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";

export default function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-center gap-4">
      
      {/* --- MENU ITEMS --- */}
      <div
        className={`flex flex-col gap-4 transition-all duration-300 ease-in-out ${
          isOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10 pointer-events-none"
        }`}
      >
        {/* Facebook - Blue */}
        <a
          href="https://www.facebook.com/profile.php?id=61577000417529"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 bg-blue-600 rounded-full text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200"
        >
          <FontAwesomeIcon icon={faFacebook} className="text-xl" />
        </a>

        {/* Instagram - Pink/Gradient-ish */}
        <a
          href="https://www.instagram.com/shreemultiservices_amravati?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 bg-pink-600 rounded-full text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200"
        >
          <FontAwesomeIcon icon={faInstagram} className="text-xl" />
        </a>

        {/* Google - Red */}
        <a
          href="https://share.google/Zs2izB4g7h8GB72o2"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 bg-red-500 rounded-full text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200"
        >
          <FontAwesomeIcon icon={faGoogle} className="text-xl" />
        </a>

        {/* WhatsApp - Green */}
        <a
          href="https://wa.me/919922145634"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 bg-green-500 rounded-full text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200"
        >
          <FontAwesomeIcon icon={faWhatsapp} className="text-2xl" />
        </a>

        {/* Phone - Yellow */}
        <a
          href="tel:+919922145634"
          className="w-12 h-12 bg-yellow-500 rounded-full text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200"
        >
          <FontAwesomeIcon icon={faPhone} className="text-lg" />
        </a>
      </div>

      {/* --- MAIN TOGGLE BUTTON --- */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full text-white flex items-center justify-center shadow-xl transition-all duration-300 ${
          isOpen ? "bg-slate-900 rotate-180" : "bg-black rotate-0"
        }`}
      >
        {isOpen ? (
          <Minus size={28} strokeWidth={3} />
        ) : (
          <Plus size={28} strokeWidth={3} />
        )}
      </button>
    </div>
  );
}