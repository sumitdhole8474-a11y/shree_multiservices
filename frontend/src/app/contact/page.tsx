"use client";

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

export default function ContactPage() {
  return (
    <main className="bg-white">
      {/* ================= HEADER ================= */}
      <section className="pt-24 pb-12 text-center">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          Contact Us
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto px-6">
          We're here to help! Reach out to our team with any questions or inquiries.
        </p>
      </section>

      {/* ================= 2 COLUMN LAYOUT ================= */}
      <section className="pb-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            
            {/* LEFT COLUMN - Contact Info */}
            <div className="space-y-6">
              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                  <FontAwesomeIcon icon={faLocationDot} className="text-lg" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Address</h3>
                  <p className="text-gray-600 text-sm mt-1">
                    New Swastik Nagar, Navathe Nagar,<br />
                    Badnera Road, Amravati - 444605
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
                    <a href="tel:+919922145634" className="text-gray-600 hover:text-blue-600 block">
                      +91 9922145634
                    </a>
                    <a href="tel:+917720001476" className="text-gray-600 hover:text-blue-600 block">
                      +91 7720001476
                    </a>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                  <FontAwesomeIcon icon={faEnvelope} className="text-lg" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Email</h3>
                  <a href="mailto:shreemulti44@gmail.com" className="text-gray-600 text-sm hover:text-blue-600">
                    shreemulti44@gmail.com
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
                  <p className="text-gray-600 text-sm mt-1">
                    Monday - Saturday: 11:00 AM - 7:00 PM<br />
                    <span className="text-red-500">Sunday: Closed</span>
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN - Map */}
            <div>
              <div className="rounded-xl overflow-hidden border border-gray-200 h-[400px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d465.87452546253115!2d77.75167838718468!3d20.912472400000006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd6a5dd24fde605%3A0x813016384f3590d!2sSHREE%20ONLINE%20RENT%20AGREEMENT%20AND%20LEAVE%20LICENCE%20AGREEMENT%20AMRAVATI!5e0!3m2!1sen!2sin!4v1771062730265!5m2!1sen!2sin"
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
      <section className="py-16 bg-gray-50 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Connect with Us
          </h2>
          
          <div className="flex justify-center gap-4">
            <a 
              href="https://www.facebook.com/profile.php?id=61577000417529" 
              className="w-12 h-12 flex items-center justify-center rounded-full bg-white hover:bg-gray-100 text-gray-600 border border-gray-200 transition-colors"
              aria-label="Facebook"
            >
              <FontAwesomeIcon icon={faFacebook} className="text-xl" />
            </a>

            <a 
              href="https://www.instagram.com/shreemultiservices_amravati?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" 
              className="w-12 h-12 flex items-center justify-center rounded-full bg-white hover:bg-gray-100 text-gray-600 border border-gray-200 transition-colors"
              aria-label="Instagram"
            >
              <FontAwesomeIcon icon={faInstagram} className="text-xl" />
            </a>

            <a 
              href="https://share.google/Zs2izB4g7h8GB72o2" 
              className="w-12 h-12 flex items-center justify-center rounded-full bg-white hover:bg-gray-100 text-gray-600 border border-gray-200 transition-colors"
              aria-label="Google"
            >
              <FontAwesomeIcon icon={faGoogle} className="text-xl" />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}