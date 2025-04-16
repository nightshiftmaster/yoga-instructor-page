import type React from "react";
import "@/app/globals.css";
import {
  Quicksand,
  DM_Sans,
  Dancing_Script,
  Playfair_Display,
  Italiana,
  Pinyon_Script,
  Cormorant_Upright,
} from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
import { cn } from "@/lib/utils";

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

const pinyonScript = Pinyon_Script({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-pinyon",
});

const cormorantUpright = Cormorant_Upright({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-cormorant",
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
        url: "https://yg-level.vercel.app/OG.jpg",
        width: 1200,
        height: 630,
        alt: "YG Level - Yoga & Pilates",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "YG Level - Yoga & Pilates",
    description:
      "Yoga, Pilates, Dance Movement Therapy & ThetaHealing with Yulia Golovin",
    images: ["https://yg-level.vercel.app/OG.jpg"],
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
    "og:image:width": "1200",
    "og:image:height": "630",
    "og:image:type": "image/jpeg",
    "og:image:secure_url": "https://yg-level.vercel.app/OG.jpg",
    "og:image:alt": "YG Level - Yoga & Pilates",
    "twitter:image:alt": "YG Level - Yoga & Pilates",
    "twitter:image:width": "1200",
    "twitter:image:height": "630",
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
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          dmSans.variable,
          quicksand.variable,
          pinyonScript.variable,
          cormorantUpright.variable
        )}
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
