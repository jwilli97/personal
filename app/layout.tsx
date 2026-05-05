import type { Metadata } from "next";
import { Geist, Geist_Mono, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Footer } from "@/components/footer";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-sans",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://jwilli.dev";
const SITE_DESCRIPTION =
  "joseph williams (jwilli) — software engineer and musician based in austin. building cincin, shipping austin stem center.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Joseph Williams — jwilli.dev",
    template: "%s — jwilli.dev",
  },
  description: SITE_DESCRIPTION,
  authors: [{ name: "Joseph Williams", url: SITE_URL }],
  creator: "Joseph Williams",
  openGraph: {
    title: "Joseph Williams — jwilli.dev",
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: "jwilli.dev",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Joseph Williams — jwilli.dev",
    description: SITE_DESCRIPTION,
    creator: "@jwilli97",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jetbrainsMono.variable} dark`}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <div className="flex-1">{children}</div>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
