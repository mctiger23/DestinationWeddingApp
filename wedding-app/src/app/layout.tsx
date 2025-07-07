import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WeddingDestination - Plan Your Dream Destination Wedding",
  description:
    "The ultimate destination wedding planning app. Manage guests, coordinate travel, and create unforgettable experiences.",
  keywords: [
    "wedding",
    "destination wedding",
    "wedding planning",
    "travel",
    "guests",
  ],
  authors: [{ name: "WeddingDestination Team" }],
  creator: "WeddingDestination",
  metadataBase: new URL("https://weddingdestination.com"),
  openGraph: {
    title: "WeddingDestination - Plan Your Dream Destination Wedding",
    description: "The ultimate destination wedding planning app",
    url: "https://weddingdestination.com",
    siteName: "WeddingDestination",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "WeddingDestination App",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WeddingDestination - Plan Your Dream Destination Wedding",
    description: "The ultimate destination wedding planning app",
    images: ["/og-image.jpg"],
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
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          inter.className,
          "min-h-screen bg-background font-sans antialiased"
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <main className="flex-1">{children}</main>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
