"use client";

import { useState } from "react";
import {
  User,
  Phone,
  Mail,
  Package,
  MessageSquare,
  Send,
} from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function EnquiryForm() {
  const [form, setForm] = useState({
    customerName: "",
    mobileNumber: "",
    email: "",
    productSlug: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);
    setError("");
    setSuccess("");

    try {
    const res = await fetch(`${API_URL}/api/enquiries`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(form),
});

const text = await res.text();
console.log("Enquiry response:", res.status, text);

if (!res.ok) {
  throw new Error(text);
}


      setSuccess("Your enquiry has been sent successfully. We’ll contact you soon.");
      setForm({
        customerName: "",
        mobileNumber: "",
        email: "",
        productSlug: "",
        message: "",
      });
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputWrapperClass =
    "relative flex items-center group transition-all duration-300 focus-within:-translate-y-1";
  const iconClass =
    "absolute left-4 text-gray-400 group-focus-within:text-blue-600 transition-colors duration-300";
  const inputClass =
    "w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none transition-all duration-300 placeholder:text-gray-400 text-gray-700 font-medium";

  return (
    <section className="relative py-24 bg-gradient-to-br from-blue-50 via-white to-indigo-50 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-blue-100/50 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8 md:p-12">
          <div className="text-center mb-12">
            <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase mb-4">
              Get in Touch
            </span>
            <h2 className="text-4xl font-bold text-gray-900">
              Enquiry Now
            </h2>
            <p className="mt-4 text-gray-500 text-lg">
              Fill the form and we’ll get back to you shortly.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div className={inputWrapperClass}>
              <User size={20} className={iconClass} />
              <input
                name="customerName"
                placeholder="Customer Name"
                className={inputClass}
                value={form.customerName}
                onChange={handleChange}
                required
              />
            </div>

            <div className={inputWrapperClass}>
              <Phone size={20} className={iconClass} />
              <input
                name="mobileNumber"
                placeholder="Mobile Number"
                className={inputClass}
                value={form.mobileNumber}
                onChange={handleChange}
                required
              />
            </div>

            <div className={inputWrapperClass}>
              <Mail size={20} className={iconClass} />
              <input
                name="email"
                placeholder="Your Email"
                className={inputClass}
                value={form.email}
                onChange={handleChange}
              />
            </div>

            <div className={inputWrapperClass}>
              <Package size={20} className={iconClass} />
              <select
                name="productSlug"
                className={`${inputClass} appearance-none cursor-pointer`}
                value={form.productSlug}
                onChange={handleChange}
              >
                <option value="">Select Services</option>
                <option value="liquor-licence">Loan Services</option>
                <option value="gold-loan">Insurance Services</option>
                <option value="rent-agreement">Setu Services</option>
                <option value="rent-agreement">Online Rent Agreement</option>
              </select>
            </div>

            <div className={`${inputWrapperClass} md:col-span-2 items-start`}>
              <MessageSquare size={20} className={`${iconClass} top-4`} />
              <textarea
                name="message"
                placeholder="How can we help you?"
                className={`${inputClass} min-h-[140px] resize-none`}
                value={form.message}
                onChange={handleChange}
              />
            </div>

            {error && (
              <p className="md:col-span-2 text-red-500 text-sm">
                {error}
              </p>
            )}

            {success && (
              <p className="md:col-span-2 text-green-600 text-sm font-medium">
                {success}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="md:col-span-2 group w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl disabled:opacity-50 transition-all flex items-center justify-center gap-2"
            >
              {loading ? "Sending..." : "Send Message"}
              <Send size={20} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
