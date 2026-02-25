"use client";

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faEnvelope,
  faLocationDot,
  faClock
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faInstagram,
  faGoogle
} from "@fortawesome/free-brands-svg-icons";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type ContactData = {
  address: string;
  phone1: string;
  phone2: string;
  email: string;
  business_hours: string;
  facebook_url: string;
  instagram_url: string;
  google_url: string;
  map_embed_url: string;
  status: string; // ✅ ADDED
};

export default function ContactPage() {
  const [contact, setContact] = useState<ContactData | null>(null);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const res = await fetch(`${API_URL}/api/contact`, {
          cache: "no-store",
        });

        if (!res.ok) throw new Error("Failed to fetch contact");

        const data = await res.json();
        setContact(data);
      } catch (err) {
        console.error("Failed to load contact details", err);
      }
    };

    fetchContact();
  }, []);

  if (!contact) return null;

  return (
    <main className="bg-white">
      {/* ================= HEADER ================= */}
      <section className="pt-14 md:pt-24 pb-12 text-center">
        <div className="flex justify-center mb-6">
          <span className="bg-blue-600 text-white text-lg md:text-xl font-semibold px-6 py-3 rounded-full shadow-md">
            Contact Us
          </span>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto px-6">
          We're here to help! Reach out to our team with any questions or inquiries.
        </p>
      </section>

      {/* ================= 2 COLUMN LAYOUT ================= */}
      <section className="pb-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

            {/* LEFT COLUMN */}
            <div className="space-y-6">

              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                  <FontAwesomeIcon icon={faLocationDot} className="text-lg" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Address</h3>
                  <p className="text-gray-600 text-sm mt-1 whitespace-pre-line">
                    {contact.address}
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                  <FontAwesomeIcon icon={faPhone} className="text-lg" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Phone</h3>
                  <div className="text-sm mt-1">
                    {contact.phone1 && (
                      <a
                        href={`tel:${contact.phone1}`}
                        className="text-gray-600 hover:text-blue-600 block"
                      >
                        {contact.phone1}
                      </a>
                    )}
                    {contact.phone2 && (
                      <a
                        href={`tel:${contact.phone2}`}
                        className="text-gray-600 hover:text-blue-600 block"
                      >
                        {contact.phone2}
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                  <FontAwesomeIcon icon={faEnvelope} className="text-lg" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Email Id</h3>
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-gray-600 text-sm hover:text-blue-600"
                  >
                    {contact.email}
                  </a>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                  <FontAwesomeIcon icon={faClock} className="text-lg" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Business Hours</h3>
                  <p className="text-gray-600 text-sm mt-1 whitespace-pre-line">
                    {contact.business_hours}
                  </p>

                  {/* ✅ STATUS BADGE (ADDED BELOW BUSINESS HOURS) */}
                  <div className="mt-4">
                    {contact.status === "working" ? (
                      <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold text-sm">
                        <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
                        We Are Open
                      </div>
                    ) : (
                      <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full font-semibold text-sm">
                        <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                        Currently Closed
                      </div>
                    )}
                  </div>

                </div>
              </div>

            </div>

            {/* RIGHT COLUMN - MAP */}
            <div>
              <div className="rounded-xl overflow-hidden border border-gray-200 h-[400px]">
                <iframe
                  src={contact.map_embed_url}
                  className="w-full h-full border-0"
                  loading="lazy"
                  title="Office Location"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= SOCIAL MEDIA ================= */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-blue-100 relative overflow-hidden">

        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-200/40 blur-3xl rounded-full pointer-events-none -z-10" />

        <div className="max-w-4xl mx-auto px-6 text-center">

          <div className="flex justify-center mb-6">
            <span className="bg-blue-600 text-white text-lg md:text-xl font-semibold px-6 py-3 rounded-full shadow-md">
              Connect With Us
            </span>
          </div>

          <p className="text-gray-600 max-w-xl mx-auto mb-10">
            Follow us on social media to stay updated with our latest services and announcements.
          </p>

          <div className="flex justify-center gap-6">

            {contact.facebook_url && (
              <a
                href={contact.facebook_url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 flex items-center justify-center rounded-full bg-white shadow-lg border border-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white hover:scale-110 transition-all duration-300"
              >
                <FontAwesomeIcon icon={faFacebook} className="text-2xl" />
              </a>
            )}

            {contact.instagram_url && (
              <a
                href={contact.instagram_url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 flex items-center justify-center rounded-full bg-white shadow-lg border border-blue-100 text-pink-600 hover:bg-gradient-to-br hover:from-pink-500 hover:to-orange-500 hover:text-white hover:scale-110 transition-all duration-300"
              >
                <FontAwesomeIcon icon={faInstagram} className="text-2xl" />
              </a>
            )}

            {contact.google_url && (
              <a
                href={contact.google_url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 flex items-center justify-center rounded-full bg-white shadow-lg border border-blue-100 text-red-500 hover:bg-red-500 hover:text-white hover:scale-110 transition-all duration-300"
              >
                <FontAwesomeIcon icon={faGoogle} className="text-2xl" />
              </a>
            )}

          </div>
        </div>
      </section>
    </main>
  );
}