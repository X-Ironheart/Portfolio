import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Cairo } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
};

export const metadata: Metadata = {
  title: "Mohamed Taher // Systems & Web Engineering // CSE [2030]",
  description:
    "Portfolio of Mohamed Taher — Computer & Systems Engineering at Horus University, Systems & IT Specialist at El-Hoda IT, and Freelance Developer.",
  keywords: [
    "Mohamed Taher",
    "Computer & Systems Engineering",
    "Horus University",
    "Systems Engineer",
    "IT Specialist",
    "Odoo ERP",
    "Shopify",
    "C Language",
    "Next.js",
    "TypeScript",
    "Damietta",
    "Egypt",
  ],
  authors: [{ name: "Mohamed Taher" }],
  creator: "Mohamed Taher",
  openGraph: {
    title: "Mohamed Taher // Systems & Web Engineering",
    description:
      "Engineering systems, optimizing logic & crafting tactile interfaces. Computer & Control Systems Engineering at Horus University.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${cairo.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#0a0a0a] text-[#e4e4e7]">{children}</body>
    </html>
  );
}
