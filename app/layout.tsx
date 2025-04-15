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
    title: "YG Level - Yoga & Pilates",
    description:
      "Yoga, Pilates, Dance Movement Therapy & ThetaHealing with Yulia Golovin",
    images: [
      {
        url: "/OGphoto.png",
        width: 1200,
        height: 630,
        alt: "YG Level - Yoga & Pilates",
      },
    ],
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
