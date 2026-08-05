import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: {
    default: "Techfolio",
    template: "%s | Techfolio",
  },
  description:
    "A portfolio application for organizing and showcasing software development projects.",
  metadataBase: new URL(
    "https://techfolio-512wrwmgt-sehees-projects-470fc9ba.vercel.app/",
  ),
  openGraph: {
    title: "Techfolio",
    description:
      "A portfolio application for organizing and showcasing software development projects.",
    type: "website",
    images: ["/opengraph-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className='flex min-h-screen flex-col'>
        <Suspense fallback={<HeaderSkeleton />}>
          <Header />
        </Suspense>

        <main className='flex-1'>{children}</main>
        <Toaster />
        <Footer />
      </body>
    </html>
  );
}

// Prevent Layout Shift
function HeaderSkeleton() {
  return (
    <header className='border-b bg-background'>
      <div className='mx-auto flex h-16 max-w-7xl items-center justify-between px-6'>
        <div className='h-[60px] w-[60px] rounded-lg bg-muted animate-pulse' />
        <div className='flex items-center gap-6'>
          <div className='h-8 w-16 rounded bg-muted animate-pulse' />
          <div className='h-8 w-20 rounded bg-muted animate-pulse' />
        </div>
      </div>
    </header>
  );
}
