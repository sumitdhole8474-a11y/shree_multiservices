import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | Shree Multiservices",
  description:
    "Read the Terms & Conditions of Shree Multiservices to understand the rules, usage policies, and legal guidelines for using our services.",
  openGraph: {
    title: "Terms & Conditions | Shree Multiservices",
    description:
      "Review the official Terms and Conditions of Shree Multiservices before using our services.",
    url: "https://shreemultiservices.com/terms-and-conditions",
    siteName: "Shree Multiservices",
    locale: "en_IN",
    type: "website",
  },
};

// 👇 The keyword 'export default' MUST be here for Next.js to work
export default function TermsAndConditionsPage() {
  return (
    <main className="min-h-screen bg-slate-50 relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-white to-slate-50 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-50/40 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />

      {/* HERO SECTION */}
      <section className="relative pt-24 pb-12 text-center max-w-4xl mx-auto px-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold uppercase tracking-widest mb-6">
          Legal Information
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
          Terms & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Conditions</span>
        </h1>
        <p className="text-slate-500 text-lg leading-relaxed max-w-2xl mx-auto">
          Please read these Terms and Conditions carefully before using the services of Shree Multiservices to ensure you understand your rights and obligations.
        </p>
      </section>

      {/* CONTENT CONTAINER */}
      <section className="relative max-w-4xl mx-auto px-6 pb-24">
        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/60 ring-1 ring-slate-100 overflow-hidden">
          
          {/* Header Bar */}
          <div className="bg-slate-50/50 border-b border-slate-100 px-8 py-4 flex items-center justify-between">
            <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
            </div>
            <span className="text-xs font-mono text-slate-400">Last Updated: January 2026</span>
          </div>

          <div className="p-8 md:p-12 space-y-12">

            {/* 1. Acceptance */}
            <div className="flex gap-6 group">
              <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 text-blue-600 flex items-center justify-center font-bold text-lg border border-blue-100">
                1
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-3">Acceptance of Terms</h2>
                <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                  By accessing or using our website and services, you agree to comply with and be bound by these Terms and Conditions. If you do not agree with these terms, please do not use our services or website.
                </p>
              </div>
            </div>

            <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

            {/* 2. Use of Services */}
            <div className="flex gap-6 group">
              <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 text-blue-600 flex items-center justify-center font-bold text-lg border border-blue-100">
                2
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-3">Use of Services</h2>
                <p className="text-slate-600 mb-4 text-sm md:text-base">
                  Our services are intended for lawful use only. By using our services, you agree not to:
                </p>
                <ul className="grid sm:grid-cols-2 gap-2">
                  {[
                    "Engage in illegal activities",
                    "Disrupt website operations",
                    "Transmit harmful code",
                    "Infringe rights of others"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-slate-600 bg-slate-50 px-3 py-2 rounded-lg">
                        <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-400 to-indigo-400" />
                        {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

            {/* 3. Intellectual Property */}
            <div className="flex gap-6 group">
              <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 text-blue-600 flex items-center justify-center font-bold text-lg border border-blue-100">
                3
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-3">Intellectual Property</h2>
                <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                  All content, materials, trademarks, and logos on our website are the property of <strong className="text-slate-900">Shree Multiservices</strong> or its licensors. You are not permitted to use, reproduce, or distribute any content from our website without prior written consent.
                </p>
              </div>
            </div>

            <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

            {/* 4. Service Descriptions */}
            <div className="flex gap-6 group">
              <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 text-blue-600 flex items-center justify-center font-bold text-lg border border-blue-100">
                4
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-3">Service Descriptions</h2>
                <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                  We strive to provide accurate information regarding government document services and related offerings. However, we do not warrant that descriptions, pricing, or other content are free from errors or omissions. We reserve the right to modify information at any time without notice.
                </p>
              </div>
            </div>

            <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

            {/* 5. Liability & 6. Warranty (Grid) */}
            <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-4">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-100 flex items-center justify-center font-bold text-amber-600">
                          5
                        </div>
                        <h2 className="text-xl font-bold text-slate-900">Limitation of Liability</h2>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed">
                        Shree Multiservices will not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from the use of our services, including inability to use services, unauthorized access to data, or third-party conduct.
                    </p>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-100 flex items-center justify-center font-bold text-amber-600">
                          6
                        </div>
                        <h2 className="text-xl font-bold text-slate-900">Warranty Disclaimer</h2>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed">
                        We do not guarantee that our services will be uninterrupted, error-free, or completely secure. Any warranties will be provided only if applicable to the specific service.
                    </p>
                </div>
            </div>

            <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

            {/* 7. Governing Law & 8. Changes (Grid) */}
            <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-4">
                     <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center font-bold text-blue-600">
                          7
                        </div>
                        <h2 className="text-xl font-bold text-slate-900">Governing Law</h2>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed">
                        These Terms and Conditions are governed by and construed in accordance with the laws of India. Any disputes arising from the use of our website or services will be subject to the jurisdiction of Indian courts.
                    </p>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center font-bold text-blue-600">
                          8
                        </div>
                        <h2 className="text-xl font-bold text-slate-900">Changes to Terms</h2>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed">
                        We reserve the right to update or modify these Terms and Conditions at any time. Changes will be posted on our website, and continued use of our services constitutes acceptance of the updated terms.
                    </p>
                </div>
            </div>

            {/* 9. Contact Box */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 relative overflow-hidden text-white">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
                
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center font-bold text-lg backdrop-blur-sm">
                            9
                        </div>
                        <h2 className="text-2xl font-bold">Contact Us</h2>
                    </div>
                    
                    <p className="text-slate-400 mb-8 max-w-lg">
                        If you have any questions or concerns regarding these Terms and Conditions, please contact us directly.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1 flex items-center gap-4 bg-white/10 border border-white/5 rounded-2xl p-4 backdrop-blur-sm hover:bg-white/15 transition-all duration-300 hover:scale-105">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg">
                                @
                            </div>
                            <div>
                                <span className="block text-xs text-slate-400 uppercase tracking-widest font-bold">Email</span>
                                <span className="text-sm font-medium text-white">shreemulti44@gmail.com</span>
                            </div>
                        </div>

                         <div className="flex-1 flex items-center gap-4 bg-white/10 border border-white/5 rounded-2xl p-4 backdrop-blur-sm hover:bg-white/15 transition-all duration-300 hover:scale-105">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg">
                                📞
                            </div>
                            <div>
                                <span className="block text-xs text-slate-400 uppercase tracking-widest font-bold">Phone</span>
                                <span className="text-sm font-medium text-white">9922145634</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-8">
          <p className="text-sm text-slate-400">
            © {new Date().getFullYear()} Shree Multiservices. All rights reserved.
          </p>
        </div>
      </section>
    </main>
  );
}