import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://suscareers.co.za"),
  title: {
    default: "SusCareers - Sustainability Talent Hub | Green Careers in South Africa",
    template: "%s | SusCareers",
  },
  description:
    "Where green careers begin. Discover sustainability, renewable energy, water management, and environmental career opportunities across South Africa.",
  keywords: [
    "sustainability careers",
    "green jobs South Africa",
    "environmental jobs",
    "renewable energy careers",
    "water management jobs",
    "ESG careers",
    "conservation jobs",
    "mining jobs South Africa",
    "graduate programs sustainability",
    "environmental consulting",
  ],
  authors: [{ name: "SusCareers" }],
  creator: "SusCareers",
  publisher: "SusCareers",
  openGraph: {
    type: "website",
    locale: "en_ZA",
    url: "https://suscareers.co.za",
    siteName: "SusCareers",
    title: "SusCareers - Sustainability Talent Hub",
    description:
      "Where green careers begin. Discover sustainability career opportunities across South Africa.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SusCareers - Sustainability Talent Hub",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SusCareers - Sustainability Talent Hub",
    description:
      "Where green careers begin. Discover sustainability career opportunities across South Africa.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://suscareers.co.za",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F8FAFC" },
    { media: "(prefers-color-scheme: dark)", color: "#080B12" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} bg-background`}
    >
      <body className="font-sans antialiased min-h-screen">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
