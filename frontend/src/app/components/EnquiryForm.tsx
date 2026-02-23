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
    "absolute left-3 md:left-4 text-gray-400 group-focus-within:text-blue-600 transition-colors duration-300";
  const inputClass =
    "w-full pl-10 md:pl-12 pr-3 md:pr-4 py-3 md:py-4 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none transition-all duration-300 placeholder:text-gray-400 text-gray-700 font-medium text-sm md:text-base";

  return (
    <section className="relative py-16 md:py-24 bg-gradient-to-br from-blue-50 via-white to-indigo-50 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] md:w-[800px] h-[600px] md:h-[800px] bg-blue-100/50 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 md:px-6">
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl md:rounded-3xl shadow-2xl border border-white/50 p-5 md:p-12">
          <div className="text-center mb-8 md:mb-12">
            <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase mb-3 md:mb-4">
              Get in Touch
            </span>
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900">
              Enquiry Now
            </h2>
            <p className="mt-2 md:mt-4 text-sm md:text-lg text-gray-500 px-2">
              Fill the form and we'll get back to you shortly.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
          >
            <div className={inputWrapperClass}>
              <User size={18} className="md:hidden text-gray-400 group-focus-within:text-blue-600 transition-colors duration-300 absolute left-3" />
              <User size={20} className="hidden md:block absolute left-4 text-gray-400 group-focus-within:text-blue-600 transition-colors duration-300" />
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
              <Phone size={18} className="md:hidden text-gray-400 group-focus-within:text-blue-600 transition-colors duration-300 absolute left-3" />
              <Phone size={20} className="hidden md:block absolute left-4 text-gray-400 group-focus-within:text-blue-600 transition-colors duration-300" />
            <input
  name="mobileNumber"
  placeholder="Mobile Number"
  className={inputClass}
  value={form.mobileNumber}
  onChange={(e) => {
    const value = e.target.value.replace(/\D/g, ""); // remove non-digits
    if (value.length <= 10) {
      setForm({ ...form, mobileNumber: value });
    }
  }}
  inputMode="numeric"
  pattern="[0-9]{10}"
  maxLength={10}
  required
/>
            </div>

            <div className={inputWrapperClass}>
              <Mail size={18} className="md:hidden text-gray-400 group-focus-within:text-blue-600 transition-colors duration-300 absolute left-3" />
              <Mail size={20} className="hidden md:block absolute left-4 text-gray-400 group-focus-within:text-blue-600 transition-colors duration-300" />
              <input
                name="email"
                placeholder="Your Email"
                className={inputClass}
                value={form.email}
                onChange={handleChange}
              />
            </div>

            <div className={inputWrapperClass}>
              <Package size={18} className="md:hidden text-gray-400 group-focus-within:text-blue-600 transition-colors duration-300 absolute left-3" />
              <Package size={20} className="hidden md:block absolute left-4 text-gray-400 group-focus-within:text-blue-600 transition-colors duration-300" />
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

          <div className={`${inputWrapperClass} md:col-span-2 items-start relative`}>
  <MessageSquare
    size={18}
    className="md:hidden absolute left-3 top-3.5 text-gray-400 group-focus-within:text-blue-600 transition-colors duration-300"
  />
  <MessageSquare
    size={20}
    className="hidden md:block absolute left-4 top-4 text-gray-400 group-focus-within:text-blue-600 transition-colors duration-300"
  />

  <textarea
    name="message"
    placeholder="How can we help you? (Max 200 characters)"
    className={`${inputClass} min-h-[120px] md:min-h-[140px] resize-none pr-14`}
    value={form.message}
    maxLength={200}
    onChange={(e) =>
      setForm({ ...form, message: e.target.value.slice(0, 200) })
    }
  />

  {/* ✅ Counter inside bottom-right */}
  <span
  className={`absolute bottom-3 right-4 text-xs transition-colors duration-200 ${
    form.message.length > 180 ? "text-red-500 font-medium" : "text-gray-400"
  }`}
>
  {form.message.length}/200
</span>
</div>

            {error && (
              <p className="md:col-span-2 text-red-500 text-xs md:text-sm px-2">
                {error}
              </p>
            )}

            {success && (
              <p className="md:col-span-2 text-green-600 text-xs md:text-sm font-medium px-2">
                {success}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="md:col-span-2 group w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3.5 md:py-4 rounded-xl font-bold text-base md:text-lg shadow-lg hover:shadow-xl disabled:opacity-50 transition-all flex items-center justify-center gap-2"
            >
              {loading ? "Sending..." : "Send Message"}
              <Send size={18} className="md:w-[20px] md:h-[20px]" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}