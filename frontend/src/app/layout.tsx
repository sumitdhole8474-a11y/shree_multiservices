import type { Metadata } from "next"; // Added for type safety
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"; 
import FloatingContact from "./components/FloatingContact";
import "./globals.css";

// This object handles the <title> and <meta name="description"> tags
export const metadata: Metadata = {
  title: "Shree Multiservices",
  description: "Website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased"> {/* Added antialiased for cleaner text */}
        <Navbar/>
        <main className="pt-6 min-h-screen">
          {children}
        </main>
        <FloatingContact/>
        <Footer/>
      </body>
    </html>
  );
}