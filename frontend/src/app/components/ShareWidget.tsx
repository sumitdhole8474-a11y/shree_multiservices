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
  Link as LinkIcon,
} from "lucide-react";

/* =============================
   WhatsApp Icon
============================= */
const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
  </svg>
);

type ShareWidgetProps = {
  title: string;
  category?: string; // ✅ optional now
};

export default function ShareWidget({
  title,
  category,
}: ShareWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, []);

  /* =============================
     FORMAT DETECTION
  ============================= */
  const formattedTitle = category
    ? `Best ${category} in Amaravati | ${title}` // Service format
    : `Get know more about us | ${title}`; // Blog format

  const handleMainShare = async () => {
    if (!currentUrl) return;

    try {
      if (navigator.share) {
        await navigator.share({
          title: formattedTitle,
          text: formattedTitle,
          url: currentUrl,
        });
      } else {
        setIsOpen(true);
      }
    } catch (err) {
      console.error("Share failed", err);
    }
  };

  const handleCopy = async () => {
    if (!currentUrl) return;

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(currentUrl);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = currentUrl;
        textArea.setAttribute("readonly", "");
        textArea.style.position = "absolute";
        textArea.style.left = "-9999px";
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }

      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  const shareLinks = [
    {
      name: "WhatsApp",
      icon: <WhatsAppIcon />,
      color: "bg-green-500 hover:bg-green-600",
      url: `https://wa.me/?text=${encodeURIComponent(
        formattedTitle + " " + currentUrl
      )}`,
    },
    {
      name: "Facebook",
      icon: <Facebook className="w-6 h-6" />,
      color: "bg-blue-600 hover:bg-blue-700",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        currentUrl
      )}`,
    },
    {
      name: "Twitter/X",
      icon: <Twitter className="w-6 h-6" />,
      color: "bg-black hover:bg-gray-800",
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        formattedTitle
      )}&url=${encodeURIComponent(currentUrl)}`,
    },
    {
      name: "LinkedIn",
      icon: <Linkedin className="w-6 h-6" />,
      color: "bg-blue-700 hover:bg-blue-800",
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        currentUrl
      )}`,
    },
  ];

  return (
    <>
      <button
        onClick={handleMainShare}
        className="px-6 py-3 bg-blue-100 hover:bg-blue-200 text-blue-700 transition rounded-full font-semibold shadow-sm flex items-center gap-2"
      >
        <Share2 size={20} />
        Share
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative">

            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h3 className="font-bold text-gray-800 text-lg">
                Share this Page
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full hover:bg-gray-200 text-gray-500 transition"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-6">

              <div className="grid grid-cols-4 gap-4">
                {shareLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-2 group"
                  >
                    <div
                      className={`w-12 h-12 ${social.color} text-white rounded-full flex items-center justify-center shadow-md transition-transform group-hover:scale-110`}
                    >
                      {social.icon}
                    </div>
                    <span className="text-xs text-gray-600 font-medium">
                      {social.name}
                    </span>
                  </a>
                ))}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  Page Link
                </label>
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
                    className={`p-2 rounded-md transition-all ${
                      copied
                        ? "bg-green-500 text-white"
                        : "bg-white text-gray-700 shadow-sm hover:bg-gray-50"
                    }`}
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