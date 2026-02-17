"use client";

import { useState } from "react";
import { Loader2, Send } from "lucide-react";
import { submitCustomerSupport } from "@/app/services/customerSupport.service";

export default function CustomerSupportPage() {
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
    address: "",
    query: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await submitCustomerSupport(form);
      setSuccess("Your query has been submitted successfully!");
      setForm({
        name: "",
        mobile: "",
        email: "",
        address: "",
        query: "",
      });
    } catch {
      setError("Failed to submit query. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const inputClasses =
    "w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition";

  const labelClasses =
    "block text-sm font-semibold text-gray-800 mb-2";

  return (
    <section className="min-h-screen bg-gray-50 pt-28 pb-24 px-6">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">
            Customer Support
          </h1>
          <p className="mt-3 text-gray-600 text-base max-w-xl mx-auto">
            Have a question or need help? Fill out the form below and our team
            will contact you shortly.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100">
          <form
            onSubmit={handleSubmit}
            className="px-8 py-10 md:px-12 md:py-12 space-y-6"
          >

            {/* Name & Mobile */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className={labelClasses}>Full Name</label>
                <input
                  name="name"
                  placeholder="Your full name"
                  value={form.name}
                  onChange={handleChange}
                  className={inputClasses}
                  required
                />
              </div>

              <div>
                <label className={labelClasses}>Mobile Number</label>
                <input
                  name="mobile"
                  placeholder="+91 98765 43210"
                  value={form.mobile}
                  onChange={handleChange}
                  className={inputClasses}
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className={labelClasses}>Email Address</label>
              <input
                name="email"
                type="email"
                placeholder="yourname@example.com"
                value={form.email}
                onChange={handleChange}
                className={inputClasses}
              />
            </div>

            {/* Address */}
            <div>
              <label className={labelClasses}>Address</label>
              <input
                name="address"
                placeholder="Street, City, Pincode"
                value={form.address}
                onChange={handleChange}
                className={inputClasses}
              />
            </div>

            {/* Message */}
            <div>
              <label className={labelClasses}>Your Message</label>
              <textarea
                name="query"
                placeholder="Please describe your query..."
                value={form.query}
                onChange={handleChange}
                className={`${inputClasses} h-32 resize-none`}
                required
              />
            </div>

            {/* Status Message */}
            {(error || success) && (
              <div
                className={`rounded-lg px-4 py-3 text-sm font-medium ${
                  error
                    ? "bg-red-50 text-red-700 border border-red-200"
                    : "bg-green-50 text-green-700 border border-green-200"
                }`}
              >
                {error || success}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 transition shadow-md active:scale-[0.98]"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  Submit Query
                  <Send className="w-5 h-5" />
                </>
              )}
            </button>

          </form>
        </div>
      </div>
    </section>
  );
}
