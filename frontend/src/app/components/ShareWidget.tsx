"use client";

import { useState, useEffect } from "react";
import { 
  Share2, 
  X, 
  Copy, 
  Check, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Link as LinkIcon 
} from "lucide-react";

// Simple WhatsApp Icon component since Lucide doesn't have the brand logo
const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

export default function ShareWidget({ title }: { title: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");

  // Get current URL on client mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareLinks = [
    {
      name: "WhatsApp",
      icon: <WhatsAppIcon />,
      color: "bg-green-500 hover:bg-green-600",
      url: `https://wa.me/?text=${encodeURIComponent(title + " " + currentUrl)}`,
    },
    {
      name: "Facebook",
      icon: <Facebook className="w-6 h-6" />,
      color: "bg-blue-600 hover:bg-blue-700",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
    },
    {
      name: "Twitter/X",
      icon: <Twitter className="w-6 h-6" />,
      color: "bg-black hover:bg-gray-800",
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(currentUrl)}`,
    },
    {
      name: "LinkedIn",
      icon: <Linkedin className="w-6 h-6" />,
      color: "bg-blue-700 hover:bg-blue-800",
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`,
    },
  ];

  return (
    <>
      {/* 🔹 Main Share Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="px-6 py-3 bg-blue-100 hover:bg-blue-200 text-blue-700 transition rounded-full font-semibold shadow-sm flex items-center gap-2"
      >
        <Share2 size={20} />
        Share
      </button>

      {/* 🔹 Popup Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative animate-in zoom-in-95 duration-200">
            
            {/* Header */}
            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h3 className="font-bold text-gray-800 text-lg">Share this Service</h3>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full hover:bg-gray-200 text-gray-500 transition"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              
              {/* Social Icons Grid */}
              <div className="grid grid-cols-4 gap-4">
                {shareLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-2 group"
                  >
                    <div className={`w-12 h-12 ${social.color} text-white rounded-full flex items-center justify-center shadow-md transition-transform group-hover:scale-110`}>
                      {social.icon}
                    </div>
                    <span className="text-xs text-gray-600 font-medium">{social.name}</span>
                  </a>
                ))}
              </div>

              {/* Copy Link Section (Good for Instagram) */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Page Link</label>
                <div className="flex items-center gap-2 bg-gray-100 p-2 rounded-lg border border-gray-200">
                  <LinkIcon size={16} className="text-gray-400 ml-2" />
                  <input 
                    type="text" 
                    readOnly 
                    value={currentUrl} 
                    className="bg-transparent border-none focus:ring-0 text-sm text-gray-600 w-full outline-none"
                  />
                  <button
                    onClick={handleCopy}
                    className={`p-2 rounded-md transition-all ${copied ? "bg-green-500 text-white" : "bg-white text-gray-700 shadow-sm hover:bg-gray-50"}`}
                  >
                    {copied ? <Check size={18} /> : <Copy size={18} />}
                  </button>
                </div>
                <p className="text-xs text-gray-400 text-center mt-2">
                  Use "Copy Link" to share on Instagram Stories.
                </p>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
}