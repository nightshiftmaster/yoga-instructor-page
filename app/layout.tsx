import type React from "react";
import "@/app/globals.css";
import { Quicksand, DM_Sans } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-quicksand",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-dmsans",
});

export const metadata = {
  title: "YG Level - Yoga & Pilates",
  description:
    "Yoga, Pilates, Dance Movement Therapy & ThetaHealing with Yulia Golovin",
  generator: "v0.dev",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yg-level.vercel.app",
    title: "YG Level - Yoga & Pilates",
    description:
      "Yoga, Pilates, Dance Movement Therapy & ThetaHealing with Yulia Golovin",
    siteName: "YG Level",
    images: [
      {
        url: "https://yg-level.vercel.app/OG.png",
        width: 1986,
        height: 1243,
        alt: "YG Level - Yoga & Pilates",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "YG Level - Yoga & Pilates",
    description:
      "Yoga, Pilates, Dance Movement Therapy & ThetaHealing with Yulia Golovin",
    images: ["https://yg-level.vercel.app/OG.png"],
  },
  alternates: {
    languages: {
      en: "/en",
      ru: "/ru",
    },
  },
  metadataBase: new URL("https://yg-level.vercel.app"),
  robots: {
    index: true,
    follow: true,
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  icons: {
    icon: "/favicon.ico",
  },
  other: {
    "og:image:width": "1986",
    "og:image:height": "1243",
    "og:image:type": "image/png",
    "og:image:secure_url": "https://yg-level.vercel.app/OG.png",
    "og:image:alt": "YG Level - Yoga & Pilates",
    "twitter:image:alt": "YG Level - Yoga & Pilates",
    "twitter:image:width": "1986",
    "twitter:image:height": "1243",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/swiper@11/swiper.min.css"
        />
      </head>
      <body
        className={`${quicksand.variable} ${dmSans.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <Toaster
            position="top-center"
            richColors
            closeButton
            theme="light"
            toastOptions={{
              className: "bg-white border border-gray-200 shadow-lg",
              duration: 5000,
            }}
          />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

import "./globals.css";
