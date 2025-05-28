// app/layout.tsx
import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import CountdownTimer from "@/components/CountdownTimer";


// Self-host fonts for performance
const poppins = Poppins({
  weight: ["700", "800"],
  subsets: ["latin"],
  variable: "--font-heading",
});

const inter = Inter({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Python Power: AI-Proof Coding Blueprint",
  description: "Master Python in 60 days and turn AI into your code-writing slave. Guaranteed.",
  keywords: ["Python course", "AI coding", "Learn programming", "ChatGPT coding"],
  openGraph: {
    images: "/og-image.jpg",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable}`}>
      <body className="bg-primary text-white font-body">
        {/* Sticky CTA bar */}
        <div className="fixed bottom-0 left-0 right-0 bg-secondary/90 backdrop-blur z-50">
          <div className="container mx-auto flex justify-between items-center p-4">
            <span className="font-heading font-bold text-lg">
              ⏳ <CountdownTimer /> LEFT!
            </span>
            <a
              href="#cta"
              className="bg-white text-primary px-8 py-3 rounded-full font-heading font-bold hover:scale-105 transition-transform animate-pulse"
            >
              YES! I Want Python Power Now
            </a>
          </div>
        </div>

        {children}
      </body>
    </html>
  );
}

// function CountdownTimer() {
//   return (
//     <span className="tabular-nums">
//       48:00:00
//     </span>
//   );
// }